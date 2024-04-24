import auth from "../styles/auth.module.css";
import { AuthRedirectLink } from "./loginComponents/AuthRedirectLink";
import { useState, useEffect, FC } from "react";
import colour from "../styles/colour.module.css";
import AuthLoginBodyProps from "../interfaces/authLoginBodyProps";
import { useNavigation } from "../../app/utility/navigation";
import { errorMessage, successMessage } from "../../app/utility/toastMessages";
import globals from "../styles/global.module.css";

export const AuthLoginBody: FC<AuthLoginBodyProps> = ({ setContainerHeight }) => {

   const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);
   const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);
   const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

   type FormData = {
      username: string;
      password: string;
   };

   const [formData, setFormData] = useState<FormData>({
      username: "",
      password: "",
   });

   const navigate = useNavigation();

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

         CheckIfExistingToken()

         const response = await fetch("/api/authentication/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });

         const data = await response.json();
         if (response.status === 200) {
            navigate("/home");
         } else {
            errorMessage(`Error logging in: ${await data.text()}`);
         }
      } catch (error) {
         errorMessage(`Error logging in: ${await error}`);
      }
   }

   const CheckIfExistingToken = async () => {
      // Get token from local storage

      // If no token, return null

      try {
         const response = await fetch("/api/authentication/token", {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         });

         const data = await response.json();
         if (response.status === 200) {
            successMessage(`Existing token: ${data.token}`);
         } else {
            errorMessage(`Error getting existing token: ${await data.text()}`);
         }
      } catch (error) {
         errorMessage(`Error getting existing token: ${await error}`);
      }
   }

   return (
      <div className={auth.loginBody}>
         <AuthRedirectLink />

         <form onSubmit={handleLogin} className={auth.authForm}>
            
            <div className={globals.fullWidthInputContainer}>
               <input
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
               <input
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
               <button type="submit" className={`${auth.authButton} ${colour.grayBorder}`} 
                  disabled={buttonDisabled}>Login</button>
            </div>
         </form>
      </div >
   )
}