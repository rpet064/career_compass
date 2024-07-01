import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

export const useAuthNavigation = () => {
 const router = useRouter();
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

export const useNavigationWithParams = () => {
  const router = useRouter();
  // const isUserAuthenticated = useAuth();
  let isUserAuthenticated = true;
 
  const navigate = (pathName: string, paramName: string, id: string) => {
     if (isUserAuthenticated && pathName && paramName && id){
      router.push({
        pathname: `${pathName}/${id}`,
      });

     } else {
       // Redirect to login page if not authenticated
       router.push('/login');
     }
  };
 
  return navigate;
 };

