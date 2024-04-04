import { useRouter } from 'next/router';

export const useNavigation = () => {
 const router = useRouter();

 const navigate = (route: string) => {
    router.push(route);
 };

 return navigate;
};