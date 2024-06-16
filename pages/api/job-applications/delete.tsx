import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function deleteJobApplication(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { jobApplicationsId, userid } = req.query;

    if (!userid || typeof userid !== 'string') {
        return res.status(400).json({ message: 'User id is required' });
    }

    if (!jobApplicationsId || typeof jobApplicationsId !== 'string') {
        return res.status(400).json({ message: 'Job application id is required' });
    }

    let userIdAsInt, jobApplicationsIdAsInt;
    try {
        userIdAsInt = parseInt(userid, 10);
    } catch {
        return res.status(400).json({ message: 'User id must be a number' });
    }

    try {
        jobApplicationsIdAsInt = parseInt(jobApplicationsId, 10);
    } catch {
        return res.status(400).json({ message: 'Job application id  must be a number' });
    }

    let isJobApplicationDeleted = await deleteJobApplicationFromDatabase(userIdAsInt, jobApplicationsIdAsInt);

    return res.status(200).json({
        message: `Job applications for user ${userid}`,
        isJobApplicationDeleted: isJobApplicationDeleted,
    });
}

async function deleteJobApplicationFromDatabase(userid: number, jobApplicationId: number): Promise<boolean> {
    console.log("id: " + userid)
    console.log("jobApplicationId" + jobApplicationId)
    try {
        let test = await prisma.jobapplications.update({
            where: {
                userid: userid,
                jobapplicationsid: jobApplicationId,
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