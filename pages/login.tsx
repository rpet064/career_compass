import { useEffect, useState } from "react";
import styles from "../app/styles/auth.module.css";
import colour from "../app/styles/colour.module.css";
import AuthHeader  from '@/customComponents/AuthHeader';
import AuthLoginBody from '@/customComponents/AuthLoginBody';
import { useAuthNavigation } from '@/utility/navigation';
import { useCookies } from 'react-cookie'

const Login = () => {
   const [containerHeight, setContainerHeight] = useState<string>("32.5%");
   const [cookies, setCookie, removeCookie] = useCookies(['userId'])
   const navigate = useAuthNavigation();

   // Check if user already logged in
   useEffect(() => {
      const fetchUserId = async () => {
          if (cookies.userId) {
            navigate("/home");
        }
      };
      fetchUserId();
    }, [cookies]);

   return (
      <div style={{ height: containerHeight }} 
         className={`${styles.loginContainer} ${colour.grayBoxShadow}`}>
         <AuthHeader title={"Sign In"}/>
         <AuthLoginBody setContainerHeight={setContainerHeight}/>
      </div>
   );
}

export default Login;