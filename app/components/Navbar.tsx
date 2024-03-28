import { FiBriefcase, FiUser, FiRefreshCcw, FiLogIn, FiLogOut, FiCompass } from "react-icons/fi";
import { useState } from "react";
import styles from '../styles/navbar.module.css';
import colour from '../styles/colour.module.css';

export default function Navbar() {

   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
   const [displayLogo, setDisplayLogo] = useState(false);

   return (
      <div className={`${styles.navbar} ${colour.lightGrayBoxShadow} ${colour.orangeBackground}`}>
         <div>
            <button onClick={() => setDisplayLogo(!displayLogo)}>{displayLogo ? <FiCompass /> : 
            <span className={styles.logoText}>Career Compass</span>}</button>
         </div>

         {/* navigation */}
         <div>
            {isUserLoggedIn ? <FiLogIn /> : <FiLogOut />}
            <FiBriefcase />
            <FiUser />
            <FiRefreshCcw />
         </div>
      </div>
   );
}