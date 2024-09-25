import { useState } from "react";
import styles from "../app/styles/auth.module.css";
import colour from "../app/styles/colour.module.css";
import AuthHeader  from '@/customComponents/AuthHeader';
import AuthLoginBody from '@/customComponents/AuthLoginBody';

const Login = () => {
   const [containerHeight, setContainerHeight] = useState<string>("32.5%");
   return (
      <div style={{ height: containerHeight }} 
         className={`${styles.loginContainer} ${colour.grayBoxShadow}`}>
         <AuthHeader title={"Sign In"}/>
         <AuthLoginBody setContainerHeight={setContainerHeight}/>
      </div>
   );
}

export default Login;