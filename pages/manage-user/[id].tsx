import { getUserDetails } from '@/proxyApi/user/getUserDetails';
import { UserDetails } from '@/interfaces/userDetails'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ManageUser(){

    const router = useRouter();
    const { id } = router.query;

    let userId: number;
    try{
        userId = id ? parseInt(id[0]) : -1;
    } catch (e) {
        throw new Error("Could not set user id")
    }

    let isNewUser = false;
    if(userId > 0)
        isNewUser = true;

    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState<UserDetails>({
      userid: '',
      roleid: '',
      username: '',
      email: '',
      title: '',
      firstname: '',
      lastname: '',
      whencreated: '',
    });
      
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getUserDetails(userId);
            if (data.userDetails.length < 1) {
              return;
            }
    
            setUserDetails(data.userDetails);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        };
    
        fetchData();
      }, [userId]);

    return (
        <p>ID: {userId}</p>
    );
}