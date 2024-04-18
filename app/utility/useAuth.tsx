import { useState, useEffect } from 'react';
import { getAuthToken } from "./localStorageManager";

export const useAuth = () => {
 const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);

 // TODO: Replace with API Call
 const checkAuthTokenValid = () => {
    return true;
 };

 useEffect(() => {
    const authToken = getAuthToken();
    if (authToken) {
      setIsUserAuthenticated(checkAuthTokenValid());
    } else {
      setIsUserAuthenticated(false);
    }
 }, []);

 return isUserAuthenticated;
};
