import styles from "../styles/auth.module.css";
import colour from "../styles/colour.module.css";
import { FC } from "react";
import { FaCompass } from "react-icons/fa";

interface AuthHeaderProps {
    isLoginScreen: boolean;
}

 export const AuthHeader: FC<AuthHeaderProps> = ({ isLoginScreen }) => {
    return(
        <div className={`${styles.header} ${colour.orangeBackground}`}>
        <FaCompass className={colour.whiteFont} />
        {isLoginScreen? <span>Sign In</span> : <span>Create Account</span>}
        <span>|</span> <span>Career Compass</span>
     </div>
    )
}