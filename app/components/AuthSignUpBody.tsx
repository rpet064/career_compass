import styles from "../styles/auth.module.css";
import colour from "../styles/colour.module.css";
import { FC } from "react";
import { AuthRedirectLink } from "../components/AuthRedirectLink";

interface AuthHeaderProps {
    isLoginScreen: boolean;
    setIsLoginScreen: (isLoginScreen: boolean) => void;
    passwordErrorMessage: string | null;
    setPasswordErrorMessage: (passwordErrorMessage: string | null) => void;
    setButtonDisabled: (buttonDisabled: boolean) => void;
    setContainerHeight: (loginContainerHeight: string) => void;
}

 export const AuthSignUpBody: FC<AuthHeaderProps> = ({ 
    isLoginScreen, passwordErrorMessage, setPasswordErrorMessage, setButtonDisabled, setContainerHeight, setIsLoginScreen }) => {
    return(
        <div className={styles.body}>
        <AuthRedirectLink isLoginScreen={isLoginScreen} setIsLoginScreen={setIsLoginScreen} />
    </div >
    )
}