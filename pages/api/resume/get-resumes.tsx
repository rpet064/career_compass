import { resumes, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserDetailsFromDatabase } from "../user/get-user";

const prisma = new PrismaClient();

export default async function getResumesHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method!== 'GET') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { userId } = req.query;
    
    if (!userId || typeof userId!== 'string') {
      return res.status(400).json({ message: 'Authenticated user is is required' });
    }

    let userIdAsInt;
    try {
      userIdAsInt = parseInt(userId, 10);
    } catch {
      return res.status(400).json({ message: 'User id must be a number'});
    }

    let userDetails = await getUserDetailsFromDatabase(userIdAsInt)
    if (!userDetails)
      return res.status(400).json({ message: 'Invalid User'});

    let resumes = await getResumesFromDatabase()
  
    return res.status(200).json({
      message: `Resumes for user ${userId}`,
      resumeList: resumes,
    });
  }

// TODO: Check if resumes belong to user
async function getResumesFromDatabase(): Promise<resumes[] | null> {
    try{
        let resumes = await prisma.resumes.findMany({
            where: {
                whendeleted: null,
            }
        });
        return resumes
    } catch (error){
        return null;
    }
}