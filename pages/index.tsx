import { useRouter } from 'next/router';
import { isAuthenticated } from "../app/utility/isAuthenticated";
import { useEffect } from 'react';

export default function Main() {
  const router = useRouter();
  const isAuth = isAuthenticated(true);

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    } else {
      router.push('/userProfile');
    }
  }, [isAuth, router]);

  return (
    <>
      <div>Loader goes here</div>
    </>
  );
}