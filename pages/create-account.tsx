import { useState } from "react";
import styles from "../app/styles/auth.module.css";
import signup from "../app/styles/signup.module.css";
import colour from "../app/styles/colour.module.css";
import { SignupHeader } from "../app/components/signupComponents/SignupHeader";
import { AuthSignUpBody } from "../app/components/AuthSignUpBody";
import { SignupFooter } from "../app/components/signupComponents/SignupFooter";

const CreateAccount = () => {

   const [newAccountContainerHeight, setNewAccountContainerHeight] = useState<string>("50%");
   const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
   const [, ] = useState<boolean>(true);
   const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

   return (
      <div style={{ height: newAccountContainerHeight }} 
         className={`${styles.loginContainer} ${signup.newAccountContainer} ${colour.grayBoxShadow}`}>

         <SignupHeader/>

         <AuthSignUpBody passwordErrorMessage={passwordErrorMessage} 
         setPasswordErrorMessage={setPasswordErrorMessage}
         setButtonDisabled={setButtonDisabled}
         setNewAccountContainerHeight={setNewAccountContainerHeight}/>

         <SignupFooter buttonDisabled={buttonDisabled} 
         setPasswordErrorMessage={setPasswordErrorMessage} />
      </div>
   );
}

export default CreateAccount;