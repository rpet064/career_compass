import { useEffect } from 'react';
import { useNavigation } from "@/app/utility/navigation";
import LoadingSpinner from "@/app/customComponents/LoadingSpinner";

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