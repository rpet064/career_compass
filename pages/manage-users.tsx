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

export default function ManageUsers({ userid, username }: UserProps) {

  const [userId, setUserId] = useState(1);
  const [userData, setuserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  if (userid === -1) {
    userid = 1;
    setUserId(userid);
  }

  const roleId = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers(userId, roleId);
        if (data.userList.length < 1) {
          return;
        }

        console.log(data.userList)

        setuserData(data.userList);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching job application:', error);
      }
    };

    fetchData();
  }, [userId]);


  return (
    <main>
      <Navbar userid={userid} />
      <section>
        <Card title="Job applications">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            userData ? (
              <UserDataTable userData={userData} />
            ) : (
              <p>No job applications found.</p>
            )
          )}
        </Card>
        <div className={globals.buttonContainer}>
          <Button label="Save" onClick={() => alert('Button clicked')} />
          <Button label="Cancel" onClick={() => alert('Button clicked')} />
        </div>
      </section>
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  return checkAuth(context);
}