import { PrismaClient } from '@prisma/client';
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
    // TODO: Check if user is already authenticated

    // Check if user exists
    let isUserAuthenticated = await authenticateUser(username, password)
    if (!isUserAuthenticated) {
        return res.status(300).json({ message: 'Username or password not valid' });
    }

    return res.status(200).json({ message: 'User Authenticated' });
};

const authenticateUser = async (username: string, password: string) => {
    const isExistingUser = await prisma.users.findFirst({
        where: {
            username: username,
            password: password
        }
    })
    return isExistingUser ? true : false;
}