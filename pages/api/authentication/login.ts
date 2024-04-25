import { PrismaClient, users } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function loginHandler (req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    // Check if user exists
    let userObject = await authenticateUser(username, password)
    if (!userObject) {
        return res.status(300).json({ message: 'Username or password not valid' });
    }

    return res.status(200).json({ 
        message: 'User Authenticated',
        userId: userObject.userid,
        username: userObject.username
    });
};

// TODO: seperate API and data layer
async function authenticateUser(username: string, password: string): Promise<users | null> {
    const isExistingUser = await prisma.users.findFirst({
        where: {
            username: username,
            password: password
        }
    })
    return isExistingUser;
}