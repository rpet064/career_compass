import styles from "../styles/auth.module.css";
import { FC } from "react";

interface AuthRedirectLinkProps {
    isLoginScreen: boolean;
    setIsLoginScreen: (isLoginScreen: boolean) => void;
}

 export const AuthRedirectLink: FC<AuthRedirectLinkProps> = ({ isLoginScreen, setIsLoginScreen }) => {
    return(
        <p>{isLoginScreen? "Create Account?" : "Have existing account?"}
        <span onClick={() => setIsLoginScreen(!isLoginScreen)}
        className={styles.newAccountSpan }>{isLoginScreen? "Sign up here" : "Login here"}</span></p>
    )
}