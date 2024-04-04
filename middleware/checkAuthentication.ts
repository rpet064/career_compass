
import { NextApiRequest, NextApiResponse } from 'next';

export const checkAuthentication = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
   
 const token = req.headers.authorization;
 if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
 }

 return handler(req, res);
};