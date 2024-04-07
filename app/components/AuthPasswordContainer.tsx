import styles from "../styles/auth.module.css";
import colour from "../styles/colour.module.css";
import { FC } from "react";

interface AuthPasswordContainerProps {
    password: string | undefined;
    setPassword: (password: string) => void;
    passwordErrorMessage: string | null;
    setIsPasswordInputFocused: (isPasswordInputFocused: boolean) => void;
    isPasswordInputFocused: boolean;
    displayPasswordInputLabel: { display: string };
}

export const AuthPasswordContainer: FC<AuthPasswordContainerProps> = ({
    password, setIsPasswordInputFocused, setPassword, displayPasswordInputLabel, passwordErrorMessage}) => {
    return (
        <div className={styles.inputContainer}>
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