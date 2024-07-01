import { FiBriefcase, FiUser, FiRefreshCcw, FiLogOut, FiCompass, FiHome, FiFileText } from "react-icons/fi";
import { FC } from "react";
import styles from '../styles/navbar.module.css';
import colour from '../styles/colour.module.css';
import { useAuthNavigation } from '../utility/navigation';
import NavbarProps from "../interfaces/navbarProps";
import { HandleLogout } from '../proxyApi/authentication/handleLogout';

const Navbar : FC<NavbarProps> = ({ userid }) => {
   const navigate = useAuthNavigation();

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
            <FiFileText onClick={() => navigateUser("manage-resume")}/>
            <FiBriefcase onClick={() => navigateUser("job-application")}/>
            <FiUser onClick={() => navigateUser("manage-users")}/>
            <FiUser onClick={() => navigateUser("user-profile")}/>
            <FiRefreshCcw onClick={() => location.reload()}/>
            <FiLogOut onClick={() => HandleLogout}/>
         </div>
      </div>
   );
}

export default Navbar;