export const deleteJobApplication = async (jobapplicationsid: number, userid: number) => {
    try {
      const url = new URL('http://localhost:3000/api/job-applications/delete');
      url.searchParams.append('jobApplicationsId', jobapplicationsid.toString());
      url.searchParams.append('userid', userid.toString());

      const response = await fetch(url, {
        method: 'PUT',
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
      console.error('Error deleting job application:', error);
    }
  };