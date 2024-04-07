import styles from "../styles/auth.module.css";
import { FC } from "react";
import { AuthRedirectLink } from "../components/AuthRedirectLink";
import { useState, useEffect } from "react";
import { AuthPasswordContainer } from "../components/AuthPasswordContainer";
import { AuthUsernameContainer } from "../components/AuthUsernameContainer";
import { AuthLoginBodyProps } from "../interfaces/interfaces";

export const AuthLoginBody: FC<AuthLoginBodyProps> = ({

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

    return (
        <div className={styles.loginBody}>
            <AuthRedirectLink isLoginScreen={isLoginScreen} setIsLoginScreen={setIsLoginScreen} />

            <AuthUsernameContainer displayUsernameInputLabel={displayUsernameInputLabel}
                setIsUsernameInputFocused={setIsUsernameInputFocused}
                setUsername={setUsername}
                usernameErrorMessage={usernameErrorMessage}
                username={username} 
                isLoginPage={true} />
                
            <AuthPasswordContainer
                password={password}
                setPassword={setPassword}
                passwordErrorMessage={passwordErrorMessage}
                setIsPasswordInputFocused={setIsPasswordInputFocused}
                isPasswordInputFocused={isPasswordInputFocused}
                displayPasswordInputLabel={displayPasswordInputLabel}
                isLoginPage={true} />
        </div >
    )
}