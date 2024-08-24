import { jobapplications } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";
import { getRecordsToCreate } from "../base/recordsToCreate";
import { error } from "console";
import { getRecordsToUpdate } from "../base/recordsToUpdate";
import { checkRecordsAreMatching } from "../base/checkRecordsAreMatching";

const prisma = new PrismaClient();

export default async function updateJobApplicationHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method!== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { jobapplicationList, userid } = req.query;
    if (!userid || typeof userid!== 'string') {
      return res.status(400).json({ message: 'User id is required' });
    }

    let parsedJobApplicationList
    if (typeof jobapplicationList === 'string') {
      try {
        parsedJobApplicationList = JSON.parse(jobapplicationList);
      } catch (e) {
        parsedJobApplicationList = jobapplicationList.split(',');
      }
    }

    if (!parsedJobApplicationList || typeof parsedJobApplicationList!== 'object') {
      return res.status(400).json({ message: 'Job applications list is required' });
    }
  
    let userIdAsInt;
    try {
      userIdAsInt = parseInt(userid, 10);
    } catch {
      return res.status(400).json({ message: 'User id must be a number' });
    }
  
    let jobApplicationsInDatabase = await getAllJobApplicationsFromDatabase(userIdAsInt);
    let jobApplicationsToCreate = await getRecordsToCreate(parsedJobApplicationList, jobApplicationsInDatabase, 'jobapplicationid')
    let jobApplicationsToUpdate = await getRecordsToUpdate(parsedJobApplicationList, jobApplicationsInDatabase, 'jobapplicationid')
    let hasMatchingRecords = false;
    
    if(jobApplicationsToUpdate && jobApplicationsInDatabase)
      hasMatchingRecords = await checkRecordsAreMatching(jobApplicationsInDatabase, jobApplicationsToUpdate)

    let areApplicationsUpdatedSuccessfully = true;
    if(jobApplicationsToUpdate && hasMatchingRecords){
      areApplicationsUpdatedSuccessfully = await updateJobApplicationsInDatabase(jobApplicationsToUpdate)
    }

    let areApplicationsCreatedSuccessfully = true;
    if(jobApplicationsToCreate){
      areApplicationsCreatedSuccessfully = await createJobApplicationsInDatabase(jobApplicationsToCreate);
    }

    if(!areApplicationsUpdatedSuccessfully || !areApplicationsCreatedSuccessfully)
    {
      return res.status(500).json({
        message: `There was an error updating job applications. Applications created successfully: 
        ${areApplicationsCreatedSuccessfully} Applications updated successfully: ${areApplicationsUpdatedSuccessfully}`,
        jobApplicationsList: jobapplicationList,
      });
    }

    return res.status(200).json({
      message: `Job applications updated for user ${userid}`,
      jobApplicationsList: jobapplicationList,
    });
  }

export async function getAllJobApplicationsFromDatabase(userid: number): Promise<jobapplications[] | null> {
    try{
        let jobApplicationsForUser = await prisma.jobapplications.findMany({
            where: {
                userid: userid,
                whendeleted: null
            }
        });
        return jobApplicationsForUser
    } catch (error){
        return null;
    }
}

export async function updateJobApplicationsInDatabase(jobapplications: jobapplications[]): Promise<boolean> {
  try{
    const updatedJobApplications = await prisma.jobapplications.updateMany({
      data: jobapplications
    });
      return true;
  } catch (error){
      console.error("Error creating job applications:", error);
      return false;
  }
}

export async function createJobApplicationsInDatabase(jobapplications: jobapplications[]): Promise<boolean> {
  try {
    await prisma.jobapplications.createMany({
      data: jobapplications,
    });
    return true;
  } catch (error) {
    console.error("Error creating job applications:", error);
    return false;
  }
}