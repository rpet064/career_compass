import React, { useState } from 'react';
import Navbar from "../app/components/Navbar";
import JobApplication from "../app/components/JobApplication";
import UserProfile from "../app/components/UserProfile";
import Footer from "../app/components/Footer";
import { useRouter } from 'next/router';
import { isAuthenticated } from "../app/utility/isAuthenticated";
import { useEffect } from 'react';

export default function Main() {
  const router = useRouter();
  const isAuth = isAuthenticated(false);

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    }
  }, [isAuth, router]);

  return (
    <main>
      <Navbar />
      <JobApplication />
      <UserProfile />
      <Footer />
    </main>
  );
}