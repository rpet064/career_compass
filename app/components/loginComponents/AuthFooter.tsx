import styles from "../../styles/auth.module.css";
import colour from "../../styles/colour.module.css";
import { FC } from "react";
import { AuthFooterProps } from "../../interfaces/interfaces";

 export const AuthFooter: FC<AuthFooterProps> = ({ buttonDisabled, setPasswordErrorMessage, username, password }) => {
     const handleLogin = () => {
        try {
            //  const data = await createUser(username, password, email, title, firstName, lastName, role);
         } catch (error) {
            return;
         }
     }

    return(
        <div className={styles.loginFooter}>
        <button className={colour.grayBorder} disabled={buttonDisabled}
            onClick={() => handleLogin()}>Login</button>
     </div>
    )
}