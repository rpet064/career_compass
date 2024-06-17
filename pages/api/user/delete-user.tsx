import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserDetailsFromDatabase } from "./get-user"

const admin = 1;
const prisma = new PrismaClient();

export default async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { userId, roleId } = req.query;

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'User id is required' });
    }

    if (!roleId || typeof roleId !== 'string') {
        return res.status(400).json({ message: 'Role id is required' });
    }

    let userIdAsInt, roleIdAsInt;
    try {
        userIdAsInt = parseInt(userId, 10);
    } catch {
        return res.status(400).json({ message: 'User id must be a number' });
    }

    try {
        roleIdAsInt = parseInt(roleId, 10);
    } catch {
        return res.status(400).json({ message: 'Role id must be a number' });
    }

    let userDetails = await getUserDetailsFromDatabase(userIdAsInt)
    if (!userDetails)
      return res.status(400).json({ message: 'Invalid User'});

    if(roleIdAsInt !== admin)
        return res.status(401).json({ message: 'Not authorised to modify this data' });

    let isUserDeleted = await deleteUserFromDatabase(userIdAsInt);

    return res.status(200).json({
        message: `User ${userId} is deleted`,
        isUserDeleted: isUserDeleted,
    });
}

async function deleteUserFromDatabase(userId: number): Promise<boolean> {
    try {
        await prisma.users.update({
            where: {
                userid: userId,
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