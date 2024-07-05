import Navbar from '@/customComponents/Navbar';
import Footer from '@/customComponents/Footer';
import { checkAuth } from '@/utility/checkAuth';
import UserProps from '@/interfaces/userProps';
import { NextPageContext } from 'next';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/customComponents/LoadingSpinner';
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import globals from "../app/styles/global.module.css";
import { getUserDetails } from '@/proxyApi/user/getUserDetails';
import { UserDetails } from '@/interfaces/userDetails'

export default function UserProfile({ userid, username }: UserProps) {

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
  const [isLoading, setIsLoading] = useState(true);

  let userId = 1;

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
    <main>
      <Navbar userid={userid} />
      <section>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Card className={globals.container} title="User Details">
            <div>
              <label><b>User ID:</b></label>
              <InputText value={userDetails.userid} readOnly />
            </div>

            <div>
              <label><b>Role ID:</b></label>
              <InputText value={userDetails.roleid} readOnly />
            </div>

            <div>
              <label><b>Username:</b></label>
              <InputText value={userDetails.username} readOnly />
            </div>

            <div>
              <label><b>Email:</b></label>
              <InputText value={userDetails.email} readOnly />
            </div>

            <div>
              <label><b>Title:</b></label>
              <InputText value={userDetails.title} readOnly />
            </div>

            <div>
              <label><b>First Name:</b></label>
              <InputText value={userDetails.firstname} readOnly />
            </div>

            <div>
              <label><b>Last Name:</b></label>
              <InputText value={userDetails.lastname} readOnly />
            </div>

            <div>
              <label><b>Created At:</b></label>
              <InputText value={userDetails.whencreated} readOnly />
            </div>
          </Card>
        )}
      </section>
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  return checkAuth(context);
}