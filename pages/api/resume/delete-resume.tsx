import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserDetailsFromDatabase } from "../user/get-user";

const prisma = new PrismaClient();

export default async function deleteResumeHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { userId, resumeId } = req.query;

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'User id is required' });
    }

    if (!resumeId || typeof resumeId !== 'string') {
        return res.status(400).json({ message: 'resume id is required' });
    }

    let userIdAsInt, resumeIdAsInt;
    try {
        userIdAsInt = parseInt(userId, 10);
    } catch {
        return res.status(400).json({ message: 'User id must be a number' });
    }

    try {
        resumeIdAsInt = parseInt(resumeId, 10);
    } catch {
        return res.status(400).json({ message: 'resume id must be a number' });
    }

    let userDetails = await getUserDetailsFromDatabase(userIdAsInt)
    if (!userDetails)
      return res.status(400).json({ message: 'Invalid User'});

    // TODO: Update resume schema to include userid (so users can't delete other user's resumes)

    let isResumeDeleted = await deleteResumeFromDatabase(resumeIdAsInt);

    return res.status(200).json({
        message: `Resume ${resumeId} is deleted`,
        isResumeDeleted: isResumeDeleted,
    });
}

async function deleteResumeFromDatabase(resumeId: number): Promise<boolean> {
    try {
        await prisma.resumes.update({
            where: {
                resumeid: resumeId,
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