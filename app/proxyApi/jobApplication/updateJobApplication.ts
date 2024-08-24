import { jobapplications } from '@prisma/client';

export const updateJobApplication = async (jobapplicationList: jobapplications[], userId: number) => {
    try {
        const url = new URL('http://localhost:3000/api/job-applications/update-job-applications');

        const payload = {
            jobapplicationList: jobapplicationList,
            userid: userId.toString(),
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating job applications:', error);
    }
};
