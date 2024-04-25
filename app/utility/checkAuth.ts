import { NextPageContext } from 'next';
import AuthResponseProps from "../interfaces/authResponseProps";
import UserProps from "../interfaces/userProps";
import { getTokenFromLocalStorage } from './localStorageManager';

export function checkAuth(context: NextPageContext): AuthResponseProps | { props: { user: UserProps } } {

    // Check if the user is authenticated
    // TO DO - Replace with useAuth logic
    const isAuthenticated: boolean  = getTokenFromLocalStorage() !== null;
     
    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
     
    // If authenticated, return the user data to the page
    // TODO: Implement getting actual user data from database
    const user: UserProps = { username: "test", userid: 1 };
    return {
        props: { user },
    };
}
   