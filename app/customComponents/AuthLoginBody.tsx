import auth from "../styles/auth.module.css";
import AuthRedirectLink from "./loginComponents/AuthRedirectLink";
import { useState, useEffect, FC } from "react";
import colour from "../styles/colour.module.css";
import AuthLoginBodyProps from "../interfaces/authLoginBodyProps";
import { useAuthNavigation } from "../utility/navigation";
import { errorMessage } from "../utility/toastMessages";
import globals from "../styles/global.module.css";
import { createNewTokenInLocalStorage } from "../utility/localStorageManager";

const AuthLoginBody: FC<AuthLoginBodyProps> = ({ setContainerHeight }) => {
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

   const navigate = useAuthNavigation();

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

         const response = await fetch("/api/authentication/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });

         const data = await response.json();
         if (response.status === 200) {

            // Create token and get from server
            let token = await createNewToken(data.userid, data.username)

            if(!token){
               throw new Error("Token could not be created")
            }

            // Create token in local storage
            if(!token){
               throw new Error("Token could not be saved to database")
            }
            let savedToLocalStorage = createNewTokenInLocalStorage(token)

            if(!savedToLocalStorage){
               throw new Error("Token could not be saved to local storage")
            }

            navigate("/home");
         } else {
            errorMessage(`Error logging in: ${await data.text()}`);
         }
      } catch (error) {
         errorMessage(`Error logging in: ${await error}`);
      }
   }

   const createNewToken = async (userid: string, username : string): Promise<string | null> => {

      let tokenData = {
         userid: userid,
         username: username,
      }

      try{
         const response = await fetch("/api/authentication/token", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(tokenData),
         });

         const data = await response.json();

         if (response.status === 200) {
            return data.token
         }
         throw new Error(`Error creating new token: ${await data.response.text()}`);

      } catch (error){
         errorMessage(`Error creating new token: ${await error}`);
         return null;
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

export default AuthLoginBody;