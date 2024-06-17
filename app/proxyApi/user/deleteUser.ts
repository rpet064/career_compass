export const deleteUserFromDatabase = async (userId: number, roleId: number) => {
    try {
        const url = new URL('http://localhost:3000/api/user/delete-user');
        url.searchParams.append('userId', userId.toString());
        url.searchParams.append('roleId', roleId.toString());

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
        console.error('Error deleting user:', error);
    }
};