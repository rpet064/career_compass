import styles from "../styles/auth.module.css";
import { FC } from "react";
import { AuthRedirectLink } from "./loginComponents/AuthRedirectLink";
import { useState, useEffect } from "react";
import { AuthLoginBodyProps } from "../interfaces/interfaces";
import colour from "../styles/colour.module.css";

export const AuthLoginBody: FC<AuthLoginBodyProps> = ({

   passwordErrorMessage, setPasswordErrorMessage, setButtonDisabled, setContainerHeight, username, password, setUsername, setPassword}) => {

   const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);
   const [displayUsernameInputLabel, setDisplayUsernameInputLabel] = useState<{ display: string }>({ display: "block" });
   const [displayPasswordInputLabel, setDisplayPasswordInputLabel] = useState<{ display: string }>({ display: "block" });
   const [IsUsernameInputFocused, setIsUsernameInputFocused] = useState<boolean>(false);
   const [isPasswordInputFocused, setIsPasswordInputFocused] = useState<boolean>(false);

   // Increase container width if displaying error message
   useEffect(() => {
      if (usernameErrorMessage !== null || passwordErrorMessage !== null) {
         setContainerHeight("32.5%");
      } else {
         setContainerHeight("30%");
      }
   }, [usernameErrorMessage, passwordErrorMessage, setContainerHeight]);

   // Manage username error message
   useEffect(() => {
      if (username === undefined) {
         setUsernameErrorMessage(null);
         return;
      }
      username.length > 0 ? setUsernameErrorMessage(null) : setUsernameErrorMessage("This field is required");
   }, [username]);

   // Manage password error message
   useEffect(() => {
      if (password === undefined) {
         setPasswordErrorMessage(null);
         return;
      }
      password.length > 0 ? setPasswordErrorMessage(null) : setPasswordErrorMessage("This field is required");
   }, [password, setPasswordErrorMessage]);

   // Manage button validation
   useEffect(() => {
      if (username !== undefined && password !== undefined && username.length > 0 && password.length > 0) {
         setButtonDisabled(false);
      } else {
         setButtonDisabled(true);
      }
   }, [username, password, setButtonDisabled]);

   return (
      <div className={styles.loginBody}>
         <AuthRedirectLink />

         <div className={styles.fullWidthInputContainer}>
            {<span style={displayUsernameInputLabel} className={`${styles.inputLabel} ${colour.lightGrayFont}`}
            >Username</span>}
            <input
               className={colour.grayBorder}
               type="username"
               value={username}
               onFocus={() => setIsUsernameInputFocused(true)}
               onBlur={() => setIsUsernameInputFocused(false)}
               onChange={(e) => setUsername(e.target.value)} />
            <span className={styles.authenticationLabel}
            >{usernameErrorMessage}</span>
         </div>

         <div className={styles.fullWidthInputContainer}>
            {<span style={displayPasswordInputLabel} className={`${styles.inputLabel} ${colour.lightGrayFont}`}
            >Password</span>}
            <input
               className={colour.grayBorder}
               type="password"
               value={password}
               onFocus={() => setIsPasswordInputFocused(true)}
               onBlur={() => setIsPasswordInputFocused(false)}
               onChange={(e) => setPassword(e.target.value)} />
            <span className={styles.authenticationLabel}
            >{passwordErrorMessage}</span>
         </div>
      </div >
   )
}