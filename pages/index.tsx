import { useEffect } from 'react';
import { useNavigation } from "../app/utility/navigation";
import LoadingSpinner from "../app/components/LoadingSpinner";

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