import { isAuthenticated } from "../app/utility/isAuthenticated";
import { useEffect } from 'react';
import { useNavigation } from "../app/utility/navigation";
import LoadingSpinner from "../app/components/LoadingSpinner";

export default function Main() {
  const isAuth = isAuthenticated(false);
  const navigate = useNavigation();

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    } else {
      navigate('/userProfile');
    }
  }, [isAuth, navigate]);

  return (
    <>
        <LoadingSpinner />
    </>
  );
}