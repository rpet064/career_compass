import { createNewToken } from "../../../middleware/JwtTokenManager";
import { PrismaClient, sessiontokens } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// TODO: Check if user is authenticated (so unauthorised users cannot create tokens)
export default async function tokenHandler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const username = req.body.username;
    const userid = parseInt(req.body.userid);

    if (!userid || !username || isNaN(userid)) {
        // Don't specify what details are required (to protect endpoint)
        return res.status(400).json({ message: 'Insufficient details to create new token' });
    }
    // Create JWT token
    let token = createNewToken(userid, username);

    // clear any existing unexpired tokens
    clearExistingToken(userid);

    // Save in datbase
    let isTokenSavedInDatabase  = await saveTokenInDatabase(userid, token);

    // Return token to save in client local storage
    if(isTokenSavedInDatabase){
        return res.status(200).json({
            message: "Token created successfully",
            token: token
        });
    }

    // Return internal server error if unable to save token
    return res.status(500).json({
        message: isTokenSavedInDatabase,
    }); 
};

async function saveTokenInDatabase (currentUserId: number, token: string): Promise<boolean>{
       try{
        const sessionToken = await prisma.sessiontokens.create({
            data: {
                token: token,
                userid: currentUserId,
                whenexpired: null as any
            }
          });
          return true;
       } catch (error) {
        //TODO: log errors
        // return "Unable to save token in database: " + error;
        return false;
       }
}

// Get valid token from database
async function getExistingToken (currentUserId: number): Promise<sessiontokens | string | null>{
    try{
        const hasExistingToken = await prisma.sessiontokens.findFirst({
            where: {
                userid: currentUserId,
                whenexpired: null as any
            }
        });
        return hasExistingToken;
    } catch (error){
        return "Unable to get token from database: " + error;
    }
}

// Make valid token expired (e.g if user creates a new session)
async function clearExistingToken (currentUserId: number): Promise<string | null>{
    try{
        await prisma.sessiontokens.updateMany({
            where: {
                userid: currentUserId,
                whenexpired: null as any
            },
            data: {
                whenexpired: new Date()
            }
        });
        return null;
    } catch (error){
        return "Unable to clear existing tokens from database: " + error;
    }
}