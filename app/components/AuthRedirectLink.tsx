import styles from "../styles/auth.module.css";
import { FC } from "react";
import { useNavigation } from "../utility/navigation";

interface AuthRedirectLinkProps {
    isLoginScreen: boolean;
    setIsLoginScreen: (isLoginScreen: boolean) => void;
}

 export const AuthRedirectLink: FC<AuthRedirectLinkProps> = ({ isLoginScreen, setIsLoginScreen }) => {

    const navigate = useNavigation();

    const navigateUser = (isNextScreenLoginScreen: boolean) => {
        if(isNextScreenLoginScreen){
              navigate('/login');
            } else {
              navigate('/create-account');
            }

        setIsLoginScreen(isNextScreenLoginScreen)
    }

    return(
        <p>{isLoginScreen? "Create Account?" : "Have existing account?"}
        <span onClick={() => navigateUser(!isLoginScreen)}
        className={styles.newAccountSpan }>{isLoginScreen? "Sign up here" : "Login here"}</span></p>
    )
}