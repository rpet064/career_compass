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
  const [jobApplication, setJobApplication] = useState([]);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

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
        console.log()
        setJobApplication(data.jobApplicationsList);
      } catch (error) {
        console.error('Error fetching job application:', error);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const data = {
        labels: monthNames,
        datasets: [
            {
                label: 'No of job applications',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: [65, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55]
            },
        ]
    };
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };

    setChartData(data);
    setChartOptions(options);
}, [jobApplication]);

  return (
      <main>
      <Navbar userid={userid} />
      <section>
        <h1>Home</h1>
        {jobApplication ? (
          <Chart type="bar" data={chartData} options={chartOptions} />
          ) : (
            <LoadingSpinner />
          )}
      </section>
      <Footer />
      </main>
    );
  }

  export async function getServerSideProps(context: NextPageContext) {
    return checkAuth(context);
   }