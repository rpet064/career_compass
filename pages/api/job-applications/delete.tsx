import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function deleteJobApplicationHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { jobapplicationid, userid } = req.query;

    if (!userid || typeof userid !== 'string') {
        return res.status(400).json({ message: 'User id is required' });
    }

    if (!jobapplicationid || typeof jobapplicationid !== 'string') {
        return res.status(400).json({ message: 'Job application id is required' });
    }

    let userIdAsInt, jobapplicationidAsInt;
    try {
        userIdAsInt = parseInt(userid, 10);
    } catch {
        return res.status(400).json({ message: 'User id must be a number' });
    }

    try {
        jobapplicationidAsInt = parseInt(jobapplicationid, 10);
    } catch {
        return res.status(400).json({ message: 'Job application id  must be a number' });
    }

    let isJobApplicationDeleted = await deleteJobApplicationFromDatabase(userIdAsInt, jobapplicationidAsInt);

    return res.status(200).json({
        message: `Job applications for user ${userid}`,
        isJobApplicationDeleted: isJobApplicationDeleted,
    });
}

async function deleteJobApplicationFromDatabase(userid: number, jobapplicationid: number): Promise<boolean> {
    try {
        await prisma.jobapplications.update({
            where: {
                userid: userid,
                jobapplicationid: jobapplicationid,
            },
            data: {
                whendeleted: new Date(),
            },

        });
        return true;
    } catch (error: any) {
        return false;
    }
}