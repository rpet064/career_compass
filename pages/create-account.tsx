import { useState } from "react";
import styles from "../app/styles/auth.module.css";
import colour from "../app/styles/colour.module.css";
import { AuthHeader } from "../app/components/AuthHeader";
import { AuthSignUpBody } from "../app/components/AuthSignUpBody";
import { AuthFooter } from "../app/components/AuthFooter";

const CreateAccount = () => {

   const [loginContainerHeight, setContainerHeight] = useState<string>("30%");
   const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
   const [isLoginScreen, setIsLoginScreen] = useState<boolean>(true);
   const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

   return (
      <div style={{ height: loginContainerHeight }} 
         className={`${styles.loginContainer} ${colour.grayBoxShadow}`}>

         <AuthHeader isLoginScreen={isLoginScreen} />

         <AuthSignUpBody isLoginScreen={isLoginScreen}
         passwordErrorMessage={passwordErrorMessage} 
         setPasswordErrorMessage={setPasswordErrorMessage}
         setButtonDisabled={setButtonDisabled}
         setIsLoginScreen={setIsLoginScreen}
         setContainerHeight={setContainerHeight}/>

         <AuthFooter isLoginScreen={   isLoginScreen} 
         buttonDisabled={buttonDisabled} 
         setPasswordErrorMessage={setPasswordErrorMessage} />
      </div>
   );
}

export default CreateAccount;