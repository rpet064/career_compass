import { jobapplications } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function logOutHandler (req: NextApiRequest, res: NextApiResponse){
        if (req.method !== 'GET') {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }

        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User id is required' });
        }
        
        let userIdAsInt
        try{
            userIdAsInt = parseInt(userId);
        } catch {
            return res.status(400).json({ message: 'User id must be a number' });
        }

        let jobApplicationsList = await getAllJobApplicationsFromDatabase(userIdAsInt)
    
        return res.status(200).json({ 
            message: `Job applications for user ${userId}`,
            jobApplicationsList: jobApplicationsList
        });
    }  

async function getAllJobApplicationsFromDatabase(userid: number): Promise<jobapplications[] | null> {
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