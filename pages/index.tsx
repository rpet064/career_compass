import React, { useState } from 'react';
import Navbar from "../app/components/Navbar"
import JobApplication from "../app/components/JobApplication"
import Login from "../app/components/Login"
import UserProfile from "../app/components/UserProfile"
import Footer from "../app/components/Footer"

export default function Main() {
 const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
 const [userName, setUserName] = useState(false);

 return (
    <>
      {isUserLoggedIn ? (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <Navbar />
          <JobApplication />
          <UserProfile />
          <Footer />
        </main>
      ) : (
        <Login />
      )}
    </>
 );
}