import Navbar from '@/customComponents/Navbar';
import Footer from '@/customComponents/Footer';
import { checkAuth } from '@/utility/checkAuth';
import UserProps from '@/interfaces/userProps';
import { NextPageContext } from 'next';
import JobApplicationDataTable from '@/primeReactComponents/JobApplicationDataTable';
import LoadingSpinner from '@/customComponents/LoadingSpinner';
import { useState, useEffect } from 'react';
import globals from "../app/styles/global.module.css";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { getJobApplications } from '@/proxyApi/jobApplication/getJobApplications';
import { jobapplications } from '@prisma/client';

export default function ManageJobApplications({ userid, username }: UserProps) {

  const [userId, setUserId] = useState(1);
  const [jobApplicationData, setJobApplicationData] = useState<jobapplications[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  if (userid === -1) {
    userid = 1;
    setUserId(userid);
  }

  const createNewJobApplication = () => {
    let newJobApplication = {
      jobapplicationsid: -1,
      userid: userid,
      resumeid: 1,
      joburl: "",
      progress: "",
      sentiment: 1,
      notes: "",
      whencreated: new Date(Date.now()),
      whendeleted: null
    }
    setJobApplicationData(prevJobApplications => [...prevJobApplications, newJobApplication]);
  }

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      const data = await getJobApplications(userId);
      if (data.jobApplicationsList.length < 1) {
        return;
      }

      console.log(data.jobApplicationsList)

      setJobApplicationData(data.jobApplicationsList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching job application:', error);
    }
  };

  return (
    <main>
      <Navbar userid={userid} />
      <section>
        <Card title="Job applications">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            jobApplicationData ? (
              <JobApplicationDataTable jobApplicationData={jobApplicationData} />
            ) : (
              <p>No job applications found.</p>
            )
          )}
          <div className={globals.buttonContainer}>
            <Button onClick={() => createNewJobApplication()}>New</Button>
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