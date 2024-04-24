import { NextPageContext } from 'next';
import { getAuthToken } from './localStorageManager';
import AuthResponseProps from "../interfaces/authResponseProps";
import UserProps from "../interfaces/userProps";

export function checkAuth(context: NextPageContext): AuthResponseProps | { props: { user: UserProps } } {

    // Check if the user is authenticated
    // TO DO - Replace with useAuth logic
    const isAuthenticated: boolean  = getAuthToken() !== null;
     
    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
     
    // If authenticated, return the user data to the page
    const user: UserProps = { username: 'JohnDoe' }; // Replace this with actual usernsme data
    return {
        props: { user }, // will be passed to the page component as props
    };
}
   