import { useState } from "react";
import styles from "../app/styles/auth.module.css";
import colour from "../app/styles/colour.module.css";
import { AuthHeader } from "../app/components/loginComponents/AuthHeader";
import { AuthLoginBody } from "../app/components/AuthLoginBody";
import { AuthFooter } from "../app/components/loginComponents/AuthFooter";

const Login = () => {

   const [username, setUsername] = useState<string | undefined>(undefined);
   const [password, setPassword] = useState<string | undefined>(undefined);
   const [loginContainerHeight, setContainerHeight] = useState<string>("30%");
   const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
   const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

   return (
      <div style={{ height: loginContainerHeight }} 
         className={`${styles.loginContainer} ${colour.grayBoxShadow}`}>

         <AuthHeader />

         <AuthLoginBody passwordErrorMessage={passwordErrorMessage} 
         setPasswordErrorMessage={setPasswordErrorMessage}
         setButtonDisabled={setButtonDisabled}
         setContainerHeight={setContainerHeight}
         username={username}
         password={password}
         setUsername={setUsername}
         setPassword={setPassword}/>

         <AuthFooter buttonDisabled={buttonDisabled} 
         setPasswordErrorMessage={setPasswordErrorMessage} />
      </div>
   );
}

export default Login;