import { useState, useEffect } from "react";
import styles from "../app/styles/auth.module.css";
import colour from "../app/styles/colour.module.css";
import { FaCompass } from "react-icons/fa";
import { AuthFooter } from "../app/components/AuthFooter";

const Login = () => {

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
   const [isLoginScreen, setIsLoginScreen] = useState<boolean>(true);

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

   return (
      <div style={{ height: loginContainerHeight }}
         className={`${styles.loginContainer} ${colour.grayBoxShadow}`}>
         {/* Header */}
         <div className={`${styles.header} ${colour.orangeBackground}`}>
            <FaCompass className={colour.whiteFont} />
            {isLoginScreen? <span>Sign In</span> : <span>Create Account</span>}
            <span>|</span> <span>Career Compass</span>
         </div>

         {/* Body */}
         <div className={styles.body}>

            <p>{isLoginScreen? "Create Account?" : "Have existing account?"}
            <span onClick={() => setIsLoginScreen(!isLoginScreen)}
            className={styles.newAccountSpan }>{isLoginScreen? "Sign up here" : "Login here"}</span></p>

            <div className={styles.inputContainer}>
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
            <div className={styles.inputContainer}>
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
         </div>
         <AuthFooter isLoginScreen={isLoginScreen} 
         buttonDisabled={buttonDisabled} 
         setPasswordErrorMessage={setPasswordErrorMessage} />
      </div>
   );
}

export default Login;