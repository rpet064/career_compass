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
import { resume } from '@prisma/client';

export default function ManageResumes({ userid, username }: UserProps) {

  const [userId, setUserId] = useState(1);
  const [resumeData, setResumeData] = useState<resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  if (userid === -1) {
    userid = 1;
    setUserId(userid);
  }

  const createNewResume = () => {
    let newResume = {
      resumeid: -1,
      // TODO: userid
      resumename: "",
      resumedescription: "",
      resumeurl: "",
      whencreated: new Date(Date.now()),
      whendeleted: null
    }
    setResumeData((prevResumeData) => [...prevResumeData, newResume]);
  }

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
            ) : (
              <p>No resumes found.</p>
            )
          )}
          <div className={globals.buttonContainer}>
            <Button onClick={() => createNewResume()}>New</Button>
          </div>
        </Card>
        <div className={globals.buttonContainer}>
          <Button label="Save" onClick={() => alert('Button clicked')} />
          <Button label="Cancel" onClick={() => alert('Button clicked')} />
        </div>
      </section>
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  return checkAuth(context);
}