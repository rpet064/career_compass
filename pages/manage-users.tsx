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

export default function ManageUsers({ userid, username }: UserProps) {

  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState<users[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  if (userid === -1) {
    userid = 1;
    setUserId(userid);
  }

  const roleId = 1;

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
    try {
      const data = await getUsers(userId, roleId);
      if (data.userList.length < 1) {
        return;
      }
      setUserData(data.userList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <main>
      <Navbar userid={userid} />
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