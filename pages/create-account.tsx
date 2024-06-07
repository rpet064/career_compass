import { useState } from "react";
import styles from "@/app/styles/auth.module.css";
import signup from "@/app/styles/signup.module.css";
import colour from "@/app/styles/colour.module.css";
import { SignupHeader } from "@/app/customComponents/signupComponents/SignupHeader";
import { AuthSignUpBody } from "@/app/customComponents/AuthSignUpBody";

const CreateAccount = () => {
   const [containerHeight, setContainerHeight] = useState<string>("50%");
   return (
      <div style={{ height: containerHeight }} 
         className={`${styles.loginContainer} ${signup.newAccountContainer} ${colour.grayBoxShadow}`}>

         <SignupHeader/>
         <AuthSignUpBody setContainerHeight={setContainerHeight}/>
      </div>
   );
}

export default CreateAccount;