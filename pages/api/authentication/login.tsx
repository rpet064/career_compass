import type { NextApiRequest, NextApiResponse } from "next";

export const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    let isUserAuthenticated = authenticateUser(username, password)
    if (!isUserAuthenticated) {
        return res.status(300).json({ message: 'Username or password not valid' });
    }

    return res.status(200).json({ message: 'User Authenticated' });
};

function checkUserAlreadyAuthenticated(username: string, password: string): boolean {
    return true;
    // Check database contains username

    // get and unhash password

    // Check password maatches hashed password stored in database
}

function authenticateUser(username: string, password: string): boolean {
    return false;;
}