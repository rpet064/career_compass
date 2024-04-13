import { useState } from "react";
import styles from "../app/styles/auth.module.css";
import signup from "../app/styles/signup.module.css";
import colour from "../app/styles/colour.module.css";
import { SignupHeader } from "../app/components/signupComponents/SignupHeader";
import { AuthSignUpBody } from "../app/components/AuthSignUpBody";

const CreateAccount = () => {

   const [newAccountContainerHeight, setNewAccountContainerHeight] = useState<string>("50%");
   const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

   const [username, setUsername] = useState<string | undefined>(undefined);
   const [password, setPassword] = useState<string | undefined>(undefined);
   const [email, setEmail] = useState<string | undefined>(undefined);
   const [title, setTitle] = useState<string | undefined>(undefined);
   const [firstName, setFirstName] = useState<string | undefined>(undefined);
   const [lastName, setLastName] = useState<string | undefined>(undefined);
   const [role, setRole] = useState<string>("User");

   return (
      <div style={{ height: newAccountContainerHeight }} 
         className={`${styles.loginContainer} ${signup.newAccountContainer} ${colour.grayBoxShadow}`}>

         <SignupHeader/>

         <AuthSignUpBody passwordErrorMessage={passwordErrorMessage} 
         setPasswordErrorMessage={setPasswordErrorMessage}
         setNewAccountContainerHeight={setNewAccountContainerHeight}
         username={username}
         password={password}
         email={email}
         title={title}
         firstName={firstName}
         lastName={lastName}
         role={role}
         setUsername={setUsername}
         setPassword={setPassword}
         setEmail={setEmail}
         setTitle={setTitle}
         setFirstName={setFirstName}
         setLastName={setLastName}
         setRole={setRole}/>
      </div>
   );
}

export default CreateAccount;