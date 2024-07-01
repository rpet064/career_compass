import { useEffect } from 'react';
import { useAuthNavigation } from '@/utility/navigation';
import LoadingSpinner from '@/customComponents/LoadingSpinner';

export default function Main() {
  const navigate = useAuthNavigation();

  useEffect(() => {
    navigate('/home');
 }, [navigate]);

  return (
    <>
        <LoadingSpinner />
    </>
  );
}