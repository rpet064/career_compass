import Navbar from "../app/customComponents/Navbar";
import Footer from "../app/customComponents/Footer";
import { checkAuth } from '../app/utility/checkAuth';
import UserProps from "@/app/interfaces/userProps";
import { NextPageContext } from 'next';
import JobApplicationDataTable from "@/app/primeReactComponents/JobApplicationDataTable";
import LoadingSpinner from "../app/customComponents/LoadingSpinner";
import React, { useState, useEffect } from 'react';

  export default function JobApplication({ userid, username }: UserProps) {
    const [userId, setUserId] = useState(1);
    const [jobApplicationData, setJobApplicationData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    if (userid === -1){
      userid = 1;
      setUserId(userid);
    }

    const getJobApplication = async (userId: number) => {
      try {
        const url = new URL('http://localhost:3000/api/job-applications/get');
        url.searchParams.append('userid', userId.toString());
    
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching job application:', error);
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getJobApplication(userId);
          if(data.jobApplicationsList.length < 1) {
            return;
          }

          console.log(data.jobApplicationsList)

          setJobApplicationData(data.jobApplicationsList);
          setIsLoading(false); 
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
        <div>Welcome, {userId}!</div>
        {isLoading ? (
        <LoadingSpinner />
      ) : (
        jobApplicationData ? (
          <JobApplicationDataTable jobApplicationData={jobApplicationData} />
        ) : (
          <p>No job applications found.</p>
        )
      )}
      </section>
      <Footer />
      </main>
    );
}

export async function getServerSideProps(context: NextPageContext) {
  return checkAuth(context);
 }