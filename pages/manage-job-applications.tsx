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
import { refreshPage } from '@/utility/refreshPage'
import { updateJobApplication } from '@/proxyApi/jobApplication/updateJobApplication';
import { useAuthNavigation } from '@/utility/navigation';
import { useCookies } from 'react-cookie'

export default function ManageJobApplications() {
  const [userId, setUserId] = useState<number | null>(null);
  const [jobApplicationData, setJobApplicationData] = useState<jobapplications[]>([]);
  const [jobApplicationDataOnLoad, setJobApplicationDataOnLoad] = useState<jobapplications[]>([]);
  const [dataHasChanged, setDataHasChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['userId'])


  const navigate = useAuthNavigation();

  const jobApplicationOnLoadData = jobApplicationData;

  const createNewJobApplication = () => {
    let newJobApplication = {
      jobapplicationid: -1,
      userid: userId,
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

    // Has paged changed
    useEffect(() => {
      const pagehasChanged = jobApplicationData !== jobApplicationOnLoadData 
      || jobApplicationData.length != jobApplicationOnLoadData.length;
      setDataHasChanged(pagehasChanged);
    }, [jobApplicationData, jobApplicationOnLoadData]);

    // is save button enabled
    useEffect(() => {
      setIsDisabled(!dataHasChanged)
    }, [dataHasChanged]);
    
  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      if(!userId)
        return;

      const data = await getJobApplications(userId);

      if(!data)
        navigate('/create-account');

      // User doesn't exist or not logged in 
      if (data.jobApplicationsList.length < 1) {
        return;
      }
      setJobApplicationData(data.jobApplicationsList);
      setJobApplicationDataOnLoad(data.jobApplicationsList)
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching job application:', error);
    }
  };

  const saveData = async () => {
    try {
      if(dataHasChanged && userId){
        updateJobApplication(jobApplicationData, userId);
    }
  } catch (error) {
      console.error('Error saving job application:', error);
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
        <Card title="Job applications">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            jobApplicationData ? (
              <JobApplicationDataTable jobApplicationData={jobApplicationData} userIdParam={userId}/>
            ) : (
              <p>No job applications found.</p>
            )
          )}
          <div className={globals.buttonContainer}>
            <Button onClick={() => createNewJobApplication()}>New</Button>
          </div>
        </Card>
        <div className={globals.buttonContainer}>
          <Button disabled={isDisabled} label="Save" onClick={() => saveData()} />
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