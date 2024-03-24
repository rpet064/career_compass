import { useState, useEffect } from "react";
import styles from "../styles/login.module.css";
import colours from "../styles/colour.module.css";
import { FaCompass } from "react-icons/fa";

export default function Login() {

   const [displayErrorMessage, setDisplayErrorMessage] = useState(null);
   const [loginContainerHeight, settingsContainerHeight] = useState("30%");
   
   // Increase container width if displaying error message
   useEffect(() => {
      if (displayErrorMessage !== null) {
         settingsContainerHeight("32.5%");
      } else {
         settingsContainerHeight("30%");
      }
   }, [displayErrorMessage]);

 return (
   <div style={{ height: loginContainerHeight }}
   className={`${styles.loginContainer} ${colours.grayBoxShadow}`}>
       {/* Header */}
      <div className={`${styles.header} ${colours.orangeBackground}`}>
         <FaCompass className={colours.whiteFont} />
         <span>Sign In</span><span>|</span> <span>Career Compass</span>
      </div>

      {/* Body */}
      <div className={styles.body}>
         <div className={styles.inputContainer}>
            <span className={`${styles.inputLabel} ${colours.lightGrayFont}`}>Username</span>
            <input></input>
            <span className={styles.authenticationLabel}>This field is required</span>
         </div>
         <div className={styles.inputContainer}>
            <span className={`${styles.inputLabel} ${colours.lightGrayFont}`}>Password</span>
            <input></input>
            <span className={styles.authenticationLabel}>This field is required</span>
         </div>
      </div>

       {/* Footer */}
       <div className={styles.footer}>
       <button className={`${styles.loginButton}`}>Login</button>
      </div>
   </div>
 );
}