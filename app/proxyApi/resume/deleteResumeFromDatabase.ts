export const deleteResumeFromDatabase = async (userId: number, resumeId: number) => {
  try {
    const url = new URL('http://localhost:3000/api/resume/delete-resume');
    url.searchParams.append('userId', userId.toString());
    url.searchParams.append('resumeId', resumeId.toString());

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
    console.error('Error deleting resume:', error);
  }
};