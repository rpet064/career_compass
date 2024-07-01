import { clearAuthTokenFromLocalStorage } from '../../utility/localStorageManager';
import { useAuthNavigation } from '../../utility/navigation';

export const HandleLogout = async (userid: number) => {

    const navigate = useAuthNavigation();

    let logoutData = {
       userid: userid,
    }

    try {
       const response = await fetch("/api/authentication/logout", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(logoutData),
      });

       const data = await response.json();

        if(!data){
          throw Error("Error logging out. Please try again.")
        }
        // Clear token from client local storage
        let isTokenClearedFromLocalStorge = clearAuthTokenFromLocalStorage();
        if(!isTokenClearedFromLocalStorge){
          throw new Error("Token could not be cleared from local storage")
        }

        navigate("/login");
    } catch (error) {
       console.log(error);
    }
 }