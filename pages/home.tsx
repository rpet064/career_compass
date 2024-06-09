import Navbar from '@/customComponents/Navbar';
import Footer from '@/customComponents/Footer';
import { checkAuth } from '@/utility/checkAuth';
import UserProps from '@/interfaces/userProps';
import { NextPageContext } from 'next';
import { Chart } from 'primereact/chart';
import { getJobApplications } from '@/proxyApi/jobApplications/getJobApplications';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/customComponents/LoadingSpinner';
import { monthNames } from '@/utility/dateFormatter';

export default function Home({ userid, username }: UserProps) {
  const [userId, setUserId] = useState(1);
  const [jobApplicationData, setJobApplicationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  if (userid === -1) {
    userid = 1;
    setUserId(userid);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getJobApplications(userId);
        if (data.jobApplicationsList.length < 1) {
          return;
        }
        setJobApplicationData(data.jobApplicationsList);
        setIsLoading(false);
        console.log()
      } catch (error) {
        console.error('Error fetching job application:', error);
      }
    };

    fetchData();
  }, [userId]);
  return (
      <main>
      <Navbar userid={userid} />
      <section>
        <h1>This is home</h1>
        <div>Welcome, {username}!</div>
      </section>
      <Footer />
      </main>
    );
  }

  export async function getServerSideProps(context: NextPageContext) {
    return checkAuth(context);
   }