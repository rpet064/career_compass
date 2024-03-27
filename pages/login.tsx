import { useState, useEffect } from "react";
import styles from "../app/styles/login.module.css";
import colours from "../app/styles/colour.module.css";
import { FaCompass } from "react-icons/fa";

export default function Login() {

   const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);
   const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);
   const [loginContainerHeight, settingsContainerHeight] = useState<string>("30%");
   const [username, setUsername] = useState<string | undefined>(undefined);
   const [password, setPassword] = useState<string | undefined>(undefined);
   const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
   const [displayUsernameInputLabel, setDisplayUsernameInputLabel] = useState<{ display: string }>({ display: "block" });
   const [displayPasswordInputLabel, setDisplayPasswordInputLabel] = useState<{ display: string }>({ display: "block" });
   const [IsUsernameInputFocused, setIsUsernameInputFocused] = useState<boolean>(false);
   const [isPasswordInputFocused, setIsPasswordInputFocused] = useState<boolean>(false);

   // Increase container width if displaying error message
   useEffect(() => {
      if (usernameErrorMessage !== null || passwordErrorMessage !== null) {
         settingsContainerHeight("32.5%");
      } else {
         settingsContainerHeight("30%");
      }
   }, [usernameErrorMessage, passwordErrorMessage]);

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
   }, [password]);

   // Manage button validation
   useEffect(() => {
      if (username !== undefined && password !== undefined && username.length > 0 && password.length > 0) {
         setButtonDisabled(false);
      } else {
         setButtonDisabled(true);
      }
   }, [username, password]);

   // Manage display of label inside username input
   useEffect(() => {
      let displayInputLabel = displayUsernameInputLabel.display;
      if(IsUsernameInputFocused)
         displayInputLabel = "none";

      if(username !== undefined && username.length > 0)
         displayInputLabel = "none";

      setDisplayUsernameInputLabel({ display: displayInputLabel })
   }, [IsUsernameInputFocused, username, displayUsernameInputLabel]);

   // Manage display of label inside password input
   useEffect(() => {
      let displayInputLabel = displayPasswordInputLabel.display;
      if(isPasswordInputFocused)
         displayInputLabel = "none";

      if(password !== undefined && password.length > 0)
         displayInputLabel = "none";

         setDisplayPasswordInputLabel({ display: displayInputLabel })
   }, [isPasswordInputFocused, password, displayPasswordInputLabel]);

   const handleLogin = async () => {
      try {
         //  const data = await loginUser(username, password);
         setPasswordErrorMessage("Invalid username or password");
      } catch (error) {
         return;
      }
   };

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
            {<span style={displayUsernameInputLabel} className={`${styles.inputLabel} ${colours.lightGrayFont}`}
            >Username</span>}
               <input
                  type="username"
                  value={username}
                  onFocus={() => setIsUsernameInputFocused(true)}
                  onBlur={() => setIsUsernameInputFocused(false)}
                  onChange={(e) => setUsername(e.target.value)} />
               <span className={styles.authenticationLabel}
               >{usernameErrorMessage}</span>
            </div>
            <div className={styles.inputContainer}>
               {<span style={displayPasswordInputLabel} className={`${styles.inputLabel} ${colours.lightGrayFont}`}
               >Password</span>}
               <input
                  type="password"
                  value={password}
                  onFocus={() => setIsPasswordInputFocused(true)}
                  onBlur={() => setIsPasswordInputFocused(false)}
                  onChange={(e) => setPassword(e.target.value)} />
               <span className={styles.authenticationLabel}
               >{passwordErrorMessage}</span>
               </div>
         </div>

         {/* Footer */}
         <div className={styles.footer}>
            <button className={`${styles.loginButton}`} disabled={buttonDisabled} onClick={handleLogin}>Login</button>
         </div>
      </div>
   );
}