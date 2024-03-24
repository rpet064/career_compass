import { FiBriefcase, FiUser, FiRefreshCcw, FiLogIn, FiLogOut, FiCompass } from "react-icons/fi";
import { useState } from "react";

export default function Navbar() {

   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
   const [displayLogo, setDsplayLogo] = useState(false);

   const toggleDisplayLogo = () => {
      setDsplayLogo(!displayLogo);
   }

 return (
    <div>
      <div>
         {displayLogo? <FiCompass /> : <span>Career Compass</span>}
      </div>

      {/* navigation */}
      <div>
         {isUserLoggedIn? <FiLogIn /> : <FiLogOut /> }
         <FiBriefcase />
         <FiUser />
         <FiRefreshCcw />
      </div>
    </div>
 );
}