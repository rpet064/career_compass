import { jobapplications } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserDetailsFromDatabase } from "../user/get-user";

const prisma = new PrismaClient();

export default async function getUserJobApplicationsHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method!== 'GET') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { userid } = req.query;
    if (!userid || typeof userid!== 'string') {
      return res.status(400).json({ message: 'User id is required' });
    }
  
    let userIdAsInt;
    try {
      userIdAsInt = parseInt(userid, 10);
    } catch {
      return res.status(400).json({ message: 'User id must be a number' });
    }

    let userDetails = await getUserDetailsFromDatabase(userIdAsInt)
    if (!userDetails)
      return res.status(400).json({ message: 'Invalid User'});
  
    let jobApplicationsList = await getAllJobApplicationsFromDatabase(userIdAsInt);
  
    return res.status(200).json({
      message: `Job applications for user ${userid}`,
      jobApplicationsList: jobApplicationsList,
    });
  }

export async function getAllJobApplicationsFromDatabase(userid: number): Promise<jobapplications[] | null> {
    try{
        let jobApplicationsForUser = await prisma.jobapplications.findMany({
            where: {
                userid: userid,
                whendeleted: null
            }
        });
        return jobApplicationsForUser
    } catch (error){
        return null;
    }
}