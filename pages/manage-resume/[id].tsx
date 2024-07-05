import { getResumeDetails } from '@/proxyApi/resume/getResumeDetails';
import { resume } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ManageResume(){

    const router = useRouter();
    const { id } = router.query;

    let resumeId: number;
    try{
        resumeId = id ? parseInt(id[0]) : -1;
    } catch (e) {
        throw new Error("Could not set resume id")
    }

    let isNewResume = false;
    if(resumeId > 0)
        isNewResume = true;

    const [isLoading, setIsLoading] = useState(true);
    const [resumeDetails, setResumeDetails] = useState<resume>({
      resumeid: -1,
      resumename: '',
      resumedescription: '',
      resumeurl: '',
      whencreated: new Date,
      whendeleted: null
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getResumeDetails(resumeId);
            if (data.resumeDetails.length < 1) {
              return;
            }
    
            setResumeDetails(data.resumeDetails);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching resume details:', error);
          }
        };
    
        fetchData();
      }, [resumeId]);

    return (
        <p>ID: {resumeId}</p>
    );
}