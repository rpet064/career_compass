export const getJobApplicationDetails = async (jobApplicationId: number) => {
    try {
      const url = new URL('http://localhost:3000/api/job-application/get-job-application');
      url.searchParams.append('jobApplicationId', jobApplicationId.toString());

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
      console.error('Error fetching job application details:', error);
    }
  };