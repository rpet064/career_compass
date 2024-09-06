import { FiBriefcase, FiUser, FiRefreshCcw, FiLogOut, FiCompass, FiHome, FiFileText, FiSettings } from "react-icons/fi";
import { FC, useState } from "react";
import styles from '../styles/navbar.module.css';
import colour from '../styles/colour.module.css';
import { useAuthNavigation } from '../utility/navigation';
import NavbarProps from "../interfaces/navbarProps";
import { HandleLogout } from '../proxyApi/authentication/handleLogout';
import { refreshPage } from '@/utility/refreshPage'

const Navbar : FC<NavbarProps> = ({ userid }) => {
   const [ isDropDownMenuDisplayed, toggleDropDownMenuDisplayed] = useState<boolean>(false);

   const navigate = useAuthNavigation();

   const ToggleMenu = () => {
      toggleDropDownMenuDisplayed(!isDropDownMenuDisplayed);
   }

   const navigateUser = (nextPage: string) => {

      // TODO: Implement local storage token
      let loggedIn = true
      if (!loggedIn)
        navigate("/login");

      navigate(`/${nextPage}`);
   }

   return (
      <div className={`${styles.navbar} ${colour.lightGrayBoxShadow} ${colour.whiteBackground}`}>
         <div>
            <button onClick={() => navigateUser("home")}>
            <FiCompass /> <span className={styles.logoText}>Career Compass</span></button>
         </div>

         <div>
            <FiHome onClick={() => navigateUser("home")}/>
            <FiFileText onClick={() => navigateUser("manage-resumes")}/>
            <FiBriefcase onClick={() => navigateUser("manage-job-applications")}/>
            <FiUser onClick={() => navigateUser("manage-users")}/>
            <FiSettings onClick={() => ToggleMenu()}/>
            { isDropDownMenuDisplayed &&
            <div className={styles.navDropdown}>
               <FiUser onClick={() => navigateUser("user-profile")}/>
               <FiRefreshCcw onClick={() => refreshPage()}/>
               <FiLogOut onClick={() => HandleLogout}/>
            </div>
            }
            </div>
      </div>
   );
}

export default Navbar;