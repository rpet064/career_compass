import styles from "../styles/auth.module.css";
import colour from "../styles/colour.module.css";
import { FC } from "react";
import { AuthUsernameContainerProps } from "../interfaces/interfaces";

export const AuthUsernameContainer: FC<AuthUsernameContainerProps> = ({
    displayUsernameInputLabel, setIsUsernameInputFocused, setUsername, usernameErrorMessage, username, isLoginPage}) => {
    return (
        <div className={isLoginPage ? styles.fullWidthInputContainer : styles.halfWidthInputContainer}>
        {<span style={displayUsernameInputLabel} className={`${styles.inputLabel} ${colour.lightGrayFont}`}
        >Username</span>}
        <input
            className={colour.grayBorder}
            type="username"
            value={username}
            onFocus={() => setIsUsernameInputFocused(true)}
            onBlur={() => setIsUsernameInputFocused(false)}
            onChange={(e) => setUsername(e.target.value)} />
        <span className={styles.authenticationLabel}
        >{usernameErrorMessage}</span>
    </div>
    )
}