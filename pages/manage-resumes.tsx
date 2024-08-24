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
import { refreshPage } from '@/utility/refreshPage'

export default function ManageResumes({ userid, username }: UserProps) {

  const [userId, setUserId] = useState(1);
  const [resumeData, setResumeData] = useState<resumes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ isNewResumeSaved, setIsNewResumeSaved ] = useState(true);

  if (userid === -1) {
    userid = 1;
    setUserId(userid);
  }

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
      const data = await getResumes(userId);
      if (data.resumeList.length < 1) {
        return;
      }

      setResumeData(data.resumeList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  return (
    <main>
      <Navbar userid={userid} />
      <section>
        <Card title="Resumes">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            resumeData ? (
              <ResumeDataTable resumeData={resumeData}/>
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