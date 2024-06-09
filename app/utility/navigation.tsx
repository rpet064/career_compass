import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

export const useNavigation = () => {
 const router = useRouter();
 const isUserAuthenticated = useAuth();

 const navigate = (route: string) => {
  let isUserAuthenticated = true;
    if (isUserAuthenticated || route.includes("/create-account")) {
      router.push(route);
    } else {
      // Redirect to login page if not authenticated
      router.push('/login');
    }
 };

 return navigate;
};
