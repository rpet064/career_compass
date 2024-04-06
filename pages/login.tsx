import { useState } from "react";
import styles from "../app/styles/auth.module.css";
import colour from "../app/styles/colour.module.css";
import { AuthHeader } from "../app/components/AuthHeader";
import { AuthLoginBody } from "../app/components/AuthLoginBody";
import { AuthSignUpBody } from "../app/components/AuthSignUpBody";
import { AuthFooter } from "../app/components/AuthFooter";

const Login = () => {

   const [loginContainerHeight, setContainerHeight] = useState<string>("30%");
   const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
   const [isLoginScreen, setIsLoginScreen] = useState<boolean>(true);
   const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

   return (
      <div style={{ height: loginContainerHeight }} 
         className={`${styles.loginContainer} ${colour.grayBoxShadow}`}>

         <AuthHeader isLoginScreen={isLoginScreen} />

         {isLoginScreen ? 
         
         <AuthLoginBody isLoginScreen={isLoginScreen}
         passwordErrorMessage={passwordErrorMessage} 
         setPasswordErrorMessage={setPasswordErrorMessage}
         setButtonDisabled={setButtonDisabled}
         setIsLoginScreen={setIsLoginScreen}
         setContainerHeight={setContainerHeight}/>

         : <AuthSignUpBody isLoginScreen={isLoginScreen} />}

         <AuthFooter isLoginScreen={isLoginScreen} 
         buttonDisabled={buttonDisabled} 
         setPasswordErrorMessage={setPasswordErrorMessage} />
      </div>
   );
}

export default Login;