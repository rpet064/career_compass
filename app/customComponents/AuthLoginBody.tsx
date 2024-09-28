'use client'

import auth from "../styles/auth.module.css";
import AuthRedirectLink from "./loginComponents/AuthRedirectLink";
import { useState, useEffect, FC } from "react";
import colour from "../styles/colour.module.css";
import AuthLoginBodyProps from "../interfaces/authLoginBodyProps";
import { useAuthNavigation } from "../utility/navigation";
import { errorMessage } from "../utility/toastMessages";
import globals from "../styles/global.module.css";
import { InputText } from "primereact/inputtext";
import { useCookies } from 'react-cookie';

const AuthLoginBody: FC<AuthLoginBodyProps> = ({ setContainerHeight }) => {
   const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);
   const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);
   const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
   const [cookies, setCookie, removeCookie] = useCookies(['userId', 'username'])

   type FormData = {
      username: string;
      password: string;
   };

   const [formData, setFormData] = useState<FormData>({
      username: "",
      password: "",
   });

   const navigate = useAuthNavigation();

   // Increase container width if displaying error message
   useEffect(() => {
      if (usernameErrorMessage !== null || passwordErrorMessage !== null) {
         setContainerHeight("37.5%");
      } else {
         setContainerHeight("35%");
      }
   }, [usernameErrorMessage, passwordErrorMessage, setContainerHeight]);


   // Manage username error message
   useEffect(() => {
      if (!formData.username) {
         setUsernameErrorMessage(null);
         return;
      }
      formData.username.length > 0 ? setUsernameErrorMessage(null) : setUsernameErrorMessage("This field is required");
   }, [formData]);


   // Manage password error message
   useEffect(() => {
      if (!formData.password) {
         setPasswordErrorMessage(null);
         return;
      }
      formData.password.length > 0 ? setPasswordErrorMessage(null) : setPasswordErrorMessage("This field is required");
   }, [formData, setPasswordErrorMessage]);


   // Manage button validation
   useEffect(() => {
      if (formData.username !== undefined && formData.password !== undefined
         && formData.username.length > 0 && formData.password.length > 0) {
         setButtonDisabled(false);
      } else {
         setButtonDisabled(true);
      }
   }, [formData, setButtonDisabled]);

   const handleChange = (e: any) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleLogin = async (e: any) => {
      e.preventDefault();

      try {
         if (!formData.username || !formData.password) {
            setPasswordErrorMessage("Username and password are required");
            return;
         }

         const response = await fetch("/api/authentication/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });

         const data = await response.json();
         if (response.status === 200) {

            setCookie("userId", data.userId);
            setCookie("username", data.username);

            navigate("/home");
         } else {
            errorMessage(`Error logging in: ${await data.text()}`);
         }
      } catch (error) {
         errorMessage(`Error logging in: ${await error}`);
      }
   }

   return (
      <div className={auth.loginBody}>
         <AuthRedirectLink />

         <form onSubmit={handleLogin} className={auth.authForm}>
            
            <div className={globals.fullWidthInputContainer}>
               <InputText
                  className={colour.grayBorder}
                  type="username"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange} />
               <span className={auth.authenticationLabel}
               >{usernameErrorMessage}</span>
            </div>

            <div className={globals.fullWidthInputContainer}>
               <InputText
                  className={colour.grayBorder}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange} />
               <span className={auth.authenticationLabel}
               >{passwordErrorMessage}</span>
            </div>

            {/* Footer */}
            <div className={auth.loginFooter}>
               <button type="submit" className={`${auth.authButton} ${colour.orangeBackground} ${colour.grayBorder} ${colour.lightGrayBoxShadow}`} 
               disabled={buttonDisabled}>Login</button>
            </div>
         </form>
      </div >
   )
}

export default AuthLoginBody;