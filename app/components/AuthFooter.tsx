import styles from "../styles/auth.module.css";
import colour from "../styles/colour.module.css";
import { FC } from "react";

interface AuthFooterProps {
    buttonDisabled: boolean;
    setPasswordErrorMessage: (message: string) => void;
    isLoginScreen: boolean;
}

 export const AuthFooter: FC<AuthFooterProps> = ({ buttonDisabled, setPasswordErrorMessage, isLoginScreen }) => {
    const handleAuthAction = async () => {

        if(isLoginScreen){
            handleLogin
            return;
        }
        createNewAccount()
     };

     const handleLogin = () => {
        try {
            //  const data = await loginUser(username, password);
            setPasswordErrorMessage("Invalid username or password");
         } catch (error) {
            return;
         }
     }

     const createNewAccount = () => {
        return
     }

    return(
        <div className={styles.loginFooter}>
        <button className={`${styles.loginButton} ${colour.grayBorder}`} disabled={buttonDisabled}
            onClick={handleAuthAction}>{isLoginScreen ? "Login" : "Create Account"}</button>
     </div>
    )
}