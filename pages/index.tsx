import { useEffect } from 'react';
import { useNavigation } from '@/utility/navigation';
import LoadingSpinner from '@/customComponents/LoadingSpinner';

export default function Main() {
  const navigate = useNavigation();

  useEffect(() => {
    navigate('/home');
 }, [navigate]);

  return (
    <>
        <LoadingSpinner />
    </>
  );
}