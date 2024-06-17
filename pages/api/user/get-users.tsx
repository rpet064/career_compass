import { users } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserDetailsFromDatabase } from "./get-user"

const prisma = new PrismaClient();
const admin = 1;

export default async function getUsers(req: NextApiRequest, res: NextApiResponse) {
    if (req.method!== 'GET') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { userId, roleId } = req.query;
    
    if (!userId || typeof userId!== 'string') {
      return res.status(401).json({ message: 'Authenticated user is is required' });
    }

    if (!roleId || typeof roleId!== 'string') {
      return res.status(401).json({ message: 'Not authorised to view this data'});
    }
  
    // TODO: "string doesn't trigger this"
    let userIdAsInt;
    try {
      userIdAsInt = parseInt(userId, 10);
    } catch {
      return res.status(400).json({ message: 'User id must be a number'});
    }

    let userDetails = await getUserDetailsFromDatabase(userIdAsInt)
    if (!userDetails)
      return res.status(400).json({ message: 'Invalid User'});

    let roleIdAsInt;
    try {
      roleIdAsInt = parseInt(roleId, 10);
    } catch {
      return res.status(400).json({ message: 'Role id must be a number' });
    }

    if(roleIdAsInt !== admin)
      return res.status(401).json({ message: 'Not authorised to view this data' });
  
    let users = await getusersFromDatabase()
  
    return res.status(200).json({
      message: `Details for user ${userId}`,
      userList: users,
    });
  }

async function getusersFromDatabase(): Promise<users[] | null> {
    try{
        let users = await prisma.users.findMany({
            where: {
                whendeleted: null,
            }
        });
        return users
    } catch (error){
        return null;
    }
}