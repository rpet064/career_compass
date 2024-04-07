import styles from "../styles/auth.module.css";
import colour from "../styles/colour.module.css";
import { FC } from "react";
import { AuthPasswordContainerProps } from "../interfaces/interfaces";

export const AuthPasswordContainer: FC<AuthPasswordContainerProps> = ({
    password, setIsPasswordInputFocused, setPassword, displayPasswordInputLabel, passwordErrorMessage, isLoginPage}) => {
    return (
        <div className={isLoginPage ? styles.fullWidthInputContainer : styles.halfWidthInputContainer}>
            {<span style={displayPasswordInputLabel} className={`${styles.inputLabel} ${colour.lightGrayFont}`}
            >Password</span>}
            <input
                className={colour.grayBorder}
                type="password"
                value={password}
                onFocus={() => setIsPasswordInputFocused(true)}
                onBlur={() => setIsPasswordInputFocused(false)}
                onChange={(e) => setPassword(e.target.value)} />
            <span className={styles.authenticationLabel}
            >{passwordErrorMessage}</span>
        </div>
    )
}