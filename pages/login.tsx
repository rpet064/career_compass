import { useState } from "react";
import styles from "../app/styles/auth.module.css";
import colour from "../app/styles/colour.module.css";
import { AuthHeader } from "../app/customComponents/loginComponents/AuthHeader";
import { AuthLoginBody } from "../app/customComponents/AuthLoginBody";

const Login = () => {
   const [containerHeight, setContainerHeight] = useState<string>("30%");
   return (
      <div style={{ height: containerHeight }} 
         className={`${styles.loginContainer} ${colour.grayBoxShadow}`}>
         <AuthHeader />
         <AuthLoginBody setContainerHeight={setContainerHeight}/>
      </div>
   );
}

export default Login;