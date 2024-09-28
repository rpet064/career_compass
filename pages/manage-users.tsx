import Navbar from '@/customComponents/Navbar';
import Footer from '@/customComponents/Footer';
import { checkAuth } from '@/utility/checkAuth';
import UserProps from '@/interfaces/userProps';
import { NextPageContext } from 'next';
import UserDataTable from '@/primeReactComponents/UserDataTable';
import LoadingSpinner from '@/customComponents/LoadingSpinner';
import { useState, useEffect } from 'react';
import globals from "../app/styles/global.module.css";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { getUsers } from '@/proxyApi/user/getUsers';
import { users } from '@prisma/client';
import { refreshPage } from '@/utility/refreshPage'
import { useAuthNavigation } from '@/utility/navigation';
import { useCookies } from 'react-cookie'

export default function ManageUsers() {

  const [userId, setUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<users[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['userId'])


  const navigate = useAuthNavigation();

  const createNewUser = () => {
    let newUser = {
        userid: -1,
        roleid: 2, // set as regular user
        username: "",
        password: "",
        email: "",
        title: "",
        firstname: "",
        lastname: "",
        whencreated: new Date(Date.now()),
        whendeleted: null
      }
      setUserData((prevUserData) => [...prevUserData, newUser]);
    }

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    const roleId = 1;
    try {
      if(!userId)
        return;

      const data = await getUsers(userId, roleId);

      if(!data)
        navigate('/create-account');

      // User doesn't exist or not logged in 
      if (data.userList.length < 1) {
        return;
      }
      setUserData(data.userList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

    // Set userId from cookies
    useEffect(() => {
      if(cookies.userId)
        setUserId(cookies.userId)
    }, [cookies]);

  return (
    <main>
      <Navbar userId={userId} />
      <section>
        <Card title="Users">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            userData ? (
              <UserDataTable userData={userData}/>
            ) : (
              <p>No users found.</p>
            )
          )}
        <div className={globals.buttonContainer}>
            <Button onClick={() => createNewUser()}>New</Button>
        </div>
        </Card>
        <div className={globals.buttonContainer}>
          <Button label="Save" onClick={() => alert('Button clicked')} />
          <Button label="Cancel" onClick={() => refreshPage()} />
        </div>
      </section>
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  return checkAuth(context);
}