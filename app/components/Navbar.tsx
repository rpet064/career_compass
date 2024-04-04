import { FiBriefcase, FiUser, FiRefreshCcw, FiLogOut, FiCompass } from "react-icons/fi";
import { useState } from "react";
import styles from '../styles/navbar.module.css';
import colour from '../styles/colour.module.css';
import { useNavigation } from '../utility/navigation';
import { logOutHandler } from '../../pages/api/authentication/logout';

export default function Navbar() {

   const navigate = useNavigation();

   const handleLogout = async () => {
      try {
          const data = await logOutHandler();
          if(!data){
            throw Error("Error logging out. Please try again.")
          }
          navigate("/login");
      } catch (error) {
         console.log(error);
      }
   }

   const navigateUser = (nextPage: string) => {

      // TODO: Implement local storage token
      let loggedIn = true
      if(!loggedIn)
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
            <FiBriefcase onClick={() => navigateUser("jobApplication")}/>
            <FiUser onClick={() => navigateUser("userProfile")}/>
            <FiRefreshCcw onClick={() => location.reload()}/>
            <FiLogOut onClick={() => handleLogout}/>
         </div>
      </div>
   );
}