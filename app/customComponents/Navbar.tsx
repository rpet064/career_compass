import { FiBriefcase, FiUser, FiRefreshCcw, FiLogOut, FiCompass, FiHome } from "react-icons/fi";
import { FC } from "react";
import styles from '@app/styles/navbar.module.css';
import colour from '@app/styles/colour.module.css';
import { useNavigation } from '../utility/navigation';
import { clearAuthTokenFromLocalStorage } from '../utility/localStorageManager';
import NavbarProps from "../interfaces/navbarProps";

const Navbar : FC<NavbarProps> = ({ userid }) => {
   const navigate = useNavigation();
   const handleLogout = async () => {

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

   const navigateUser = (nextPage: string) => {

      // TODO: Implement local storage token
      let loggedIn = true
      if (!loggedIn)
        navigate("/login");

      navigate(`/${nextPage}`);
   }

   return (
      <div className={`${styles.navbar} ${colour.lightGrayBoxShadow} ${colour.orangeBackground}`}>
         <div>
            <button onClick={() => navigateUser("home")}>
            <FiCompass /> <span className={styles.logoText}>Career Compass</span></button>
         </div>

         <div>
            <FiHome onClick={() => navigateUser("home")}/>
            <FiBriefcase onClick={() => navigateUser("job-application")}/>
            <FiUser onClick={() => navigateUser("user-profile")}/>
            <FiRefreshCcw onClick={() => location.reload()}/>
            <FiLogOut onClick={() => handleLogout}/>
         </div>
      </div>
   );
}

export default Navbar;