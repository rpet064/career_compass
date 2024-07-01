import { users } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function getUserDetailsHandler(req: NextApiRequest, res: NextApiResponse) {
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
  
    let userDetails = await getUserDetailsFromDatabase(userIdAsInt);
  
    return res.status(200).json({
      message: `Details for user ${userid}`,
      userDetails: userDetails,
    });
  }

export async function getUserDetailsFromDatabase(userid: number): Promise<users | null> {
    try{
        let userDetails = await prisma.users.findFirst({
            where: {
                userid: userid,
                whendeleted: null
            }
        });
        return userDetails
    } catch (error){
        return null;
    }
}