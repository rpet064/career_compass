import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

export const useNavigation = () => {
export const useAuthNavigation = () => {
 const router = useRouter();
 const isUserAuthenticated = useAuth();
//  const isUserAuthenticated = useAuth();
let isUserAuthenticated = true;

 const navigate = (route: string) => {
    if (isUserAuthenticated || route.includes("/create-account")) {
      router.push(route);
    } else {
      // Redirect to login page if not authenticated
      router.push('/login');
    }
 };

 return navigate;
};
