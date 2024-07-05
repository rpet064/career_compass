import { getJobApplicationDetails } from '@/proxyApi/jobApplication/getJobApplicationDetails';
import { jobapplications } from '@prisma/client';
import router from 'next/router';
import { useEffect, useState } from 'react';

export default function ManageJobApplication(){

    const [isLoading, setIsLoading] = useState(true);
    const [jobApplicationDetails, setJobApplicationDetails] = useState<jobapplications>({
      jobapplicationsid: -1,
      userid: -1,
      resumeid: -1,
      joburl: '',
      progress: '',
      sentiment: -1,
      notes: '',
      whencreated: new Date,
      whendeleted: null
    });

    const { id } = router.query;

    let jobApplicationId: number;
    try{
        jobApplicationId = id ? parseInt(id[0]) : -1;
    } catch (e) {
        throw new Error("Could not set job application id")
    }

    let isNewJobApplication = false;
    if(jobApplicationId > 0)
        isNewJobApplication = true;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getJobApplicationDetails(jobApplicationId);
            if (data.jobApplicationDetails.length < 1) {
              return;
            }
    
            setJobApplicationDetails(data.jobApplicationDetails);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching job application details:', error);
          }
        };
    
        fetchData();
      }, [jobApplicationId]);

    return (
        <p>ID: {jobApplicationId}</p>
    );
}