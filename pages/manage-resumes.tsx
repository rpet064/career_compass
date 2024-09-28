import Navbar from '@/customComponents/Navbar';
import Footer from '@/customComponents/Footer';
import { checkAuth } from '@/utility/checkAuth';
import UserProps from '@/interfaces/userProps';
import { NextPageContext } from 'next';
import ResumeDataTable from '@/primeReactComponents/ResumeDataTable';
import LoadingSpinner from '@/customComponents/LoadingSpinner';
import { useState, useEffect } from 'react';
import globals from "../app/styles/global.module.css";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { getResumes } from '@/proxyApi/resume/getResumes';
import { resumes } from '@prisma/client';
import { refreshPage } from '@/utility/refreshPage';
import { useAuthNavigation } from '@/utility/navigation';
import { useCookies } from 'react-cookie'

export default function ManageResumes() {
  const [userId, setUserId] = useState<number | null>(null);
  const [resumeData, setResumeData] = useState<resumes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ isNewResumeSaved, setIsNewResumeSaved ] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['userId'])

  const navigate = useAuthNavigation();

  const createNewResume = () => {
    let newResume = {
      resumeid: -1,
      userid: -1,
      resumename: "",
      resumedescription: "",
      resumeurl: "",
      whencreated: new Date(Date.now()),
      whendeleted: null
    }
    setResumeData((prevResumeData) => [...prevResumeData, newResume]);
  }

  useEffect(() => {
    resumeData.forEach(resume => {
      if(resume.resumeid < 1){
        setIsNewResumeSaved(false);
        return
      }
      setIsNewResumeSaved(true);
    });
  }, [resumeData]);

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      if(!userId)
        return;

      const data = await getResumes(userId);

      // User doesn't exist or not logged in 
      if(!data)
        navigate('/create-account');

      // No resumes created
      if (data.resumeList.length < 1) {
        return;
      }

      setResumeData(data.resumeList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

    // Set userId from cookies
    useEffect(() => {
      if(cookies.userId)
        setUserId(cookies.userId)
    }, [cookies]);

  return (
    <main>
      <Navbar userId={userId} />
      <section>
        <Card title="Resumes">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            resumeData ? (
              <ResumeDataTable resumeData={resumeData} userIdParam={userId}/>
            ) : (
              <p>No resumes found.</p>
            )
          )}
          { isNewResumeSaved &&
          <div className={globals.buttonContainer}>
            <Button onClick={() => createNewResume()}>New</Button>
          </div>
          }
        </Card>
        <div className={globals.buttonContainer}>
          <Button label="Save" onClick={() => alert('Button clicked')} />
          <Button label="Cancel" onClick={() => refreshPage()} />
        </div>
      </section>
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  return checkAuth(context);
}