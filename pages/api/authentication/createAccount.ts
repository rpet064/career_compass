// pages/api/authentication/createAccount.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`)
        }

    const { username, password, email, title, firstName, lastName } = req.body;

    try {
      // Consider hashing the password before storing it
      const newUser = await prisma.users.create({
        data: {
          username: username,
          password: password,
          email: email,
          title: title,
          firstname: firstName,
          lastname: lastName,
          roleid: 2 // user
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: `Error creating account: ${error}`});
    }
 }
