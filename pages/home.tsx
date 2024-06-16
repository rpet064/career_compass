import Navbar from '@/customComponents/Navbar';
import Footer from '@/customComponents/Footer';
import { checkAuth } from '@/utility/checkAuth';
import UserProps from '@/interfaces/userProps';
import { NextPageContext } from 'next';
import { Chart } from 'primereact/chart';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/customComponents/LoadingSpinner';
import { monthNames } from '@/utility/dateFormatter';
import { getJobApplicationsByMonth } from '@/proxyApi/jobApplications/getJobApplicationsByMonth';
import { jobApplicationsByMonth } from '@/interfaces/jobApplicationsByMonth';
import { Card } from 'primereact/card';

export default function Home({ userid, username }: UserProps) {
  const [userId, setUserId] = useState(1);
  const [jobApplicationsByMonth, setJobApplicationsByMonth] = useState<jobApplicationsByMonth[]>([]);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [isGraphDataFetched, setIsGraphDataFetched] = useState<boolean>(false);
  const numOfMonths = 12;
  const [graphData, setGraphData] = useState<number[]>(Array(numOfMonths).fill(0));

  useEffect(() => {
    if(jobApplicationsByMonth.length < 1){
      setIsGraphDataFetched(false);
      return
    }
    setIsGraphDataFetched(true);
  }, [jobApplicationsByMonth]);

  const updateAtIndex = (index: number, newValue: number) => {
    setGraphData(prevState => {
      // Create a copy of the previous state
      const newState = [...prevState];
      // Update the value at the specified index
      newState[index] = newValue;
      // Return the new state array
      return newState;
    });
  };

  const updateGraphData = () => {
    jobApplicationsByMonth.forEach(applicationsCount => {
      updateAtIndex(applicationsCount.month, applicationsCount.count)
    });
  };

  const fetchData = async (userId: number) => {
    try {
      const data = await getJobApplicationsByMonth(userId);
      if (!data ||!data.jobApplicationsGroupedByMonth || data.jobApplicationsGroupedByMonth.length < 1) {
        setJobApplicationsByMonth([]);
        return;
      }
      setJobApplicationsByMonth(await data.jobApplicationsGroupedByMonth);
      updateGraphData();
    } catch (error) {
      console.error('Error fetching job application:', error);
    }
  };

  useEffect(() => {
    fetchData(userId);
  }, [userId, isGraphDataFetched]);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    const data = {
        labels: monthNames,
        datasets: [
            {
                label: 'No. job applications',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                data: graphData
            },
        ]
    };
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        scales: {
            x: {
                ticks: {
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                }
            },
        }
    };

    setChartData(data);
    setChartOptions(options);
}, [graphData, jobApplicationsByMonth]);

  return (
      <main>
      <Navbar userid={userid} />
      <section>
      <Card title="Home">
        {jobApplicationsByMonth ? (
          <Chart type="bar" data={chartData} options={chartOptions} />
          ) : (
            <LoadingSpinner />
          )}
          </Card>
      </section>
      <Footer />
      </main>
    );
  }

  export async function getServerSideProps(context: NextPageContext) {
    return checkAuth(context);
   }