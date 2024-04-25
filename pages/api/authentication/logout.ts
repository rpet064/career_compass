import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function logOutHandler (req: NextApiRequest, res: NextApiResponse){

    const { userid } = req.body;

    let clearExistingTokenMessage = await clearExistingToken(userid);

    // Return error message to client
    if(clearExistingTokenMessage){
        return { message: clearExistingTokenMessage };
    }
    return res.status(200).json({ 
        message: 'Logout successful',
    });
};

// TODO: Implement in data layer as seperate query
async function clearExistingToken(userid: number): Promise<string | null> {
    try{
        await prisma.sessiontokens.updateMany({
            where: {
                userid: userid,
                whenexpired: undefined
            },
            data: {
                whenexpired: new Date()
            }
        });
    } catch (error){
        return "Unable to clear existing tokens from database: " + error;
    }
    return null;
}