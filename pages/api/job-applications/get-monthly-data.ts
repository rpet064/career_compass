import type { NextApiRequest, NextApiResponse } from "next";
import { getAllJobApplicationsFromDatabase } from './get'
import { jobapplications } from "@prisma/client";

interface jobApplicationsByMonth {
    "month": number
    "count": 0
  };

export default async function getUserJobApplicationsByMonthHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method!== 'GET') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { userid } = req.query;
    if (!userid || typeof userid!== 'string') {
      return res.status(400).json({ message: 'User id is required' });
    }
  
    let userIdAsInt;
    try {
      userIdAsInt = parseInt(userid, 10);
    } catch {
      return res.status(400).json({ message: 'User id must be a number' });
    }
  
    let jobApplicationsList = await getAllJobApplicationsFromDatabase(userIdAsInt);
    let jobApplicationsGroupedByMonth: Array<jobApplicationsByMonth> = await groupJobApplicationsByMonth(jobApplicationsList);
  
    return res.status(200).json({
      message: `Job applications for user ${userid}`,
      jobApplicationsGroupedByMonth: jobApplicationsGroupedByMonth,
    });
  }

  async function groupJobApplicationsByMonth(jobApplicationsList: Array<jobapplications> | null){
    let jobApplicationsGroupedByMonth = new Array<jobApplicationsByMonth>();

    if(!jobApplicationsList)
        return jobApplicationsGroupedByMonth;

    for (let i = 0; i < jobApplicationsList.length; i++) {
        let whenApplicationCreated = jobApplicationsList[i].whencreated;

        if(!whenApplicationCreated)
            continue;

        // index for getMonth() starts at 0
        let monthApplicationCreated: number = whenApplicationCreated.getMonth() + 1;

        const doesMonthExist = jobApplicationsGroupedByMonth.some(app => app.month === monthApplicationCreated);
        if (!doesMonthExist) {
            let newMonth: jobApplicationsByMonth = {
                "month": monthApplicationCreated,
                "count": 0
             };
            jobApplicationsGroupedByMonth.push(newMonth)
          }
          const foundIndex = jobApplicationsGroupedByMonth.findIndex(app => app.month === monthApplicationCreated);
          jobApplicationsGroupedByMonth[foundIndex].count++;
        }
    return jobApplicationsGroupedByMonth;
}