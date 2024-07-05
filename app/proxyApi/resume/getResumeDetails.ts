export const getResumeDetails = async (resumeId: number) => {
    try {
      const url = new URL('http://localhost:3000/api/resume/get-resume');
      url.searchParams.append('resumeid', resumeId.toString());

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
      console.error('Error fetching resume details:', error);
    }
  };