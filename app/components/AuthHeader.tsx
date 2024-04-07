import styles from "../styles/auth.module.css";
import colour from "../styles/colour.module.css";
import { FC } from "react";
import { FaCompass } from "react-icons/fa";
import { AuthHeaderProps } from "../interfaces/interfaces";

 export const AuthHeader: FC<AuthHeaderProps> = ({ isLoginScreen }) => {

    const headerStyle = isLoginScreen ? styles.header : styles.newAccountHeader

    return(
        <div className={`${headerStyle} ${colour.orangeBackground}`}>
        <FaCompass className={colour.whiteFont} />
        {isLoginScreen? <span>Sign In</span> : <span>Create Account</span>}
        <span>|</span> <span>Career Compass</span>
     </div>
    )
}