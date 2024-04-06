import styles from "../styles/auth.module.css";
import colour from "../styles/colour.module.css";
import { FC } from "react";
import { AuthRedirectLink } from "../components/AuthRedirectLink";
import { useState, useEffect } from "react";

interface AuthHeaderProps {
    isLoginScreen: boolean;
    setIsLoginScreen: (isLoginScreen: boolean) => void;
    passwordErrorMessage: string | null;
    setPasswordErrorMessage: (passwordErrorMessage: string | null) => void;
    setButtonDisabled: (buttonDisabled: boolean) => void;
    setContainerHeight: (loginContainerHeight: string) => void;
}

export const AuthLoginBody: FC<AuthHeaderProps> = ({

    isLoginScreen, passwordErrorMessage, setPasswordErrorMessage, setButtonDisabled, setContainerHeight, setIsLoginScreen }) => {

    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [displayUsernameInputLabel, setDisplayUsernameInputLabel] = useState<{ display: string }>({ display: "block" });
    const [displayPasswordInputLabel, setDisplayPasswordInputLabel] = useState<{ display: string }>({ display: "block" });
    const [IsUsernameInputFocused, setIsUsernameInputFocused] = useState<boolean>(false);
    const [isPasswordInputFocused, setIsPasswordInputFocused] = useState<boolean>(false);

    // Increase container width if displaying error message
   useEffect(() => {
    if (usernameErrorMessage !== null || passwordErrorMessage !== null) {
       setContainerHeight("32.5%");
    } else {
       setContainerHeight("30%");
    }
 }, [usernameErrorMessage, passwordErrorMessage, setContainerHeight]);

 // Manage username error message
 useEffect(() => {
    if (username === undefined) {
       setUsernameErrorMessage(null);
       return;
    }
    username.length > 0 ? setUsernameErrorMessage(null) : setUsernameErrorMessage("This field is required");
 }, [username]);

 // Manage password error message
 useEffect(() => {
    if (password === undefined) {
       setPasswordErrorMessage(null);
       return;
    }
    password.length > 0 ? setPasswordErrorMessage(null) : setPasswordErrorMessage("This field is required");
 }, [password, setPasswordErrorMessage]);

 // Manage button validation
 useEffect(() => {
    if (username !== undefined && password !== undefined && username.length > 0 && password.length > 0) {
       setButtonDisabled(false);
    } else {
       setButtonDisabled(true);
    }
 }, [username, password, setButtonDisabled]);

 // Manage display of label inside username input
 useEffect(() => {
    let displayInputLabel = displayUsernameInputLabel.display;
    if(IsUsernameInputFocused)
       displayInputLabel = "none";

    if(username !== undefined && username.length > 0)
       displayInputLabel = "none";

    setDisplayUsernameInputLabel({ display: displayInputLabel })
 }, [IsUsernameInputFocused, username, displayUsernameInputLabel]);

 // Manage display of label inside password input
 useEffect(() => {
    let displayInputLabel = displayPasswordInputLabel.display;
    if(isPasswordInputFocused)
       displayInputLabel = "none";

    if(password !== undefined && password.length > 0)
       displayInputLabel = "none";

       setDisplayPasswordInputLabel({ display: displayInputLabel })
 }, [isPasswordInputFocused, password, displayPasswordInputLabel]);

    return (
        <div className={styles.body}>
            <AuthRedirectLink isLoginScreen={isLoginScreen} setIsLoginScreen={setIsLoginScreen} />
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
        </div >
    )
}