import styles from "../styles/auth.module.css";
import colour from "../styles/colour.module.css";
import { FC } from "react";

interface AuthUsernameContainerProps {
    displayUsernameInputLabel: { display: string };
    setIsUsernameInputFocused: (isFocused: boolean) => void;
    setUsername: (username: string) => void;
    usernameErrorMessage: string | null;
    username: string | undefined;
}

export const AuthUsernameContainer: FC<AuthUsernameContainerProps> = ({
    displayUsernameInputLabel, setIsUsernameInputFocused, setUsername, usernameErrorMessage, username}) => {
    return (
        <div className={styles.inputContainer}>
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