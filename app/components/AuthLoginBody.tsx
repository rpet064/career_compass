import auth from "../styles/auth.module.css";
import { AuthRedirectLink } from "./loginComponents/AuthRedirectLink";
import { useState, useEffect, FC } from "react";
import colour from "../styles/colour.module.css";
import { AuthLoginBodyProps } from "../interfaces/interfaces";

export const AuthLoginBody: FC<AuthLoginBodyProps> = ({setContainerHeight}) => {

   const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);
   const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);
   const [displayUsernameInputLabel, setDisplayUsernameInputLabel] = useState<{ display: string }>({ display: "block" });
   const [displayPasswordInputLabel, setDisplayPasswordInputLabel] = useState<{ display: string }>({ display: "block" });
   const [IsUsernameInputFocused, setIsUsernameInputFocused] = useState<boolean>(false);
   const [isPasswordInputFocused, setIsPasswordInputFocused] = useState<boolean>(false);
   const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

   // Increase container width if displaying error message
   // useEffect(() => {
   //    if (usernameErrorMessage !== null || passwordErrorMessage !== null) {
   //       setContainerHeight("32.5%");
   //    } else {
   //       setContainerHeight("30%");
   //    }
   // }, [usernameErrorMessage, passwordErrorMessage, setContainerHeight]);

   // // Manage username error message
   // useEffect(() => {
   //    if (username === undefined) {
   //       setUsernameErrorMessage(null);
   //       return;
   //    }
   //    username.length > 0 ? setUsernameErrorMessage(null) : setUsernameErrorMessage("This field is required");
   // }, [username]);

   // // Manage password error message
   // useEffect(() => {
   //    if (password === undefined) {
   //       setPasswordErrorMessage(null);
   //       return;
   //    }
   //    password.length > 0 ? setPasswordErrorMessage(null) : setPasswordErrorMessage("This field is required");
   // }, [password, setPasswordErrorMessage]);

   // // Manage button validation
   // useEffect(() => {
   //    if (username !== undefined && password !== undefined && username.length > 0 && password.length > 0) {
   //       setButtonDisabled(false);
   //    } else {
   //       setButtonDisabled(true);
   //    }
   // }, [username, password, setButtonDisabled]);

   const [formData, setFormData] = useState({
      username: '',
      password: '',
      email: '',
      title: '',
      firstName: '',
      lastName: '',
      role: '',
   });
  
   const handleChange = (e: any) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleLogin = async () => {
      var username = "test";
      var password = "password";
      try {
          if (!username || !password) {
              setPasswordErrorMessage('Username and password are required');
              return;
          }

          const response = await fetch('/api/authentication/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
        
            if (response.ok) {
              const data = await response.json();
              console.log('Account created:', data);
              // Optionally, clear the form or redirect the user
            } else {
              console.error('Error creating account:', await response.text());
            }

          // Check if user exists
       } catch (error) {
          return;
       }
   }

   return (
      <div className={auth.loginBody}>
         <AuthRedirectLink />

         <form onSubmit={handleLogin} className={auth.loginContainer}>
         <div className={auth.fullWidthInputContainer}>
            {<span style={displayUsernameInputLabel} className={`${auth.inputLabel} ${colour.lightGrayFont}`}
            >Username</span>}
            <input
               className={colour.grayBorder}
               type="username"
               name="username"
               value={formData.username}
               onFocus={() => setIsUsernameInputFocused(true)}
               onBlur={() => setIsUsernameInputFocused(false)}
               onChange={handleChange} />
            <span className={auth.authenticationLabel}
            >{usernameErrorMessage}</span>
         </div>

         <div className={auth.fullWidthInputContainer}>
            {<span style={displayPasswordInputLabel} className={`${auth.inputLabel} ${colour.lightGrayFont}`}
            >Password</span>}
            <input
               className={colour.grayBorder}
               type="password"
               name="password"
               value={formData.password}
               onFocus={() => setIsPasswordInputFocused(true)}
               onBlur={() => setIsPasswordInputFocused(false)}
               onChange={handleChange} />
            <span className={auth.authenticationLabel}
            >{passwordErrorMessage}</span>
         </div>
         <button className={colour.grayBorder} disabled={buttonDisabled}
            onClick={() => handleLogin()}>Login</button>
         </form>
      </div >
   )
}