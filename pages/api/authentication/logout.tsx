import type { NextApiRequest, NextApiResponse } from "next";

export const logoutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    res.status(200).json({ message: 'Logout successful' });
};