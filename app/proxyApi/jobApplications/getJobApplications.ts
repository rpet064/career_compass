export const getJobApplications = async (userId: number) => {
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