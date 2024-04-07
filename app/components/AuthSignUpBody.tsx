import styles from "../styles/auth.module.css";
import colour from "../styles/colour.module.css";
import { FC, useState, useEffect } from "react";
import { AuthRedirectLink } from "../components/AuthRedirectLink";
import { AuthPasswordContainer } from "../components/AuthPasswordContainer";
import { AuthUsernameContainer } from "../components/AuthUsernameContainer";
import { AuthSignUpBodyProps } from "../interfaces/interfaces";

export const AuthSignUpBody: FC<AuthSignUpBodyProps> = ({
    isLoginScreen, passwordErrorMessage, setPasswordErrorMessage, setButtonDisabled, setNewAccountContainerHeight, setIsLoginScreen }) => {

    const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [firstName, setFirstName] = useState<string | undefined>(undefined);
    const [lastName, setLastName] = useState<string | undefined>(undefined);
    const [role, setRole] = useState<string>("User");

    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);

    const [IsUsernameInputFocused, setIsUsernameInputFocused] = useState<boolean>(false);
    const [isPasswordInputFocused, setIsPasswordInputFocused] = useState<boolean>(false);
    const [isEmailInputFocused, setIsEmailInputFocused] = useState<boolean>(false);
    const [isTitleInputFocused, setIsTitleInputFocused] = useState<boolean>(false);
    const [isFirstNameInputFocused, setIsFirstNameInputFocused] = useState<boolean>(false);
    const [isLastNameInputFocused, setIsLastNameInputFocused] = useState<boolean>(false);

    const [displayUsernameInputLabel, setDisplayUsernameInputLabel] = useState<{ display: string }>({ display: "block" });
    const [displayPasswordInputLabel, setDisplayPasswordInputLabel] = useState<{ display: string }>({ display: "block" });
    const [displayEmailInputLabel, setDisplayEmailInputLabel] = useState<{ display: string }>({ display: "block" });
    const [displayTitleInputLabel, setDisplayTitleInputLabel] = useState<{ display: string }>({ display: "block" });
    const [displayFirstNameInputLabel, setDisplayFirstNameInputLabel] = useState<{ display: string }>({ display: "block" });
    const [displayLastNameInputLabel, setDisplayLastNameInputLabel] = useState<{ display: string }>({ display: "block" });

    const [isAdmin, setIsAdmin] = useState<boolean>(true);

    // Increase container width if displaying error message
    useEffect(() => {
        if (usernameErrorMessage !== null || passwordErrorMessage !== null) {
            setNewAccountContainerHeight("52.5%");
        } else {
            setNewAccountContainerHeight("50%");
        }
    }, [usernameErrorMessage, passwordErrorMessage, setNewAccountContainerHeight]);

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

    const changeRole = (e: any) => {
        setRole(e.target.value);
    }

    return (
        <div className={styles.newAccountBody}>
            <AuthRedirectLink isLoginScreen={isLoginScreen} setIsLoginScreen={setIsLoginScreen} />

            <div className={styles.newAccountInputContainer}>
                <AuthUsernameContainer displayUsernameInputLabel={displayUsernameInputLabel}
                    setIsUsernameInputFocused={setIsUsernameInputFocused}
                    setUsername={setUsername}
                    usernameErrorMessage={usernameErrorMessage}
                    username={username}
                    isLoginPage={false}
                />

                <div className={styles.halfWidthInputContainer}>
                    {<span style={displayEmailInputLabel} className={`${styles.inputLabel} ${colour.lightGrayFont}`}
                    >Email</span>}
                    <input
                        className={colour.grayBorder}
                        type="email"
                        value={email}
                        onFocus={() => setIsEmailInputFocused(true)}
                        onBlur={() => setIsEmailInputFocused(false)}
                        onChange={(e) => setEmail(e.target.value)} />
                    <span className={styles.authenticationLabel}
                    >{emailErrorMessage}</span>
                </div>

                <AuthPasswordContainer
                    password={password}
                    setPassword={setPassword}
                    passwordErrorMessage={passwordErrorMessage}
                    setIsPasswordInputFocused={setIsPasswordInputFocused}
                    isPasswordInputFocused={isPasswordInputFocused}
                    displayPasswordInputLabel={displayPasswordInputLabel}
                    isLoginPage={false} />

                <div className={styles.oneThirdWidthInputContainer}>
                    {<span style={displayTitleInputLabel} className={`${styles.inputLabel} ${colour.lightGrayFont}`}
                    >Title</span>}
                    <input
                        className={colour.grayBorder}
                        type="Title"
                        value={title}
                        onFocus={() => setIsTitleInputFocused(true)}
                        onBlur={() => setIsTitleInputFocused(false)}
                        onChange={(e) => setTitle(e.target.value)} />
                    <span className={styles.authenticationLabel}
                    >{emailErrorMessage}</span>
                </div>

                <div className={styles.oneThirdWidthInputContainer}>
                    {<span style={displayFirstNameInputLabel} className={`${styles.inputLabel} ${colour.lightGrayFont}`}
                    >First Name</span>}
                    <input
                        className={colour.grayBorder}
                        type="First Name"
                        value={firstName}
                        onFocus={() => setIsFirstNameInputFocused(true)}
                        onBlur={() => setIsFirstNameInputFocused(false)}
                        onChange={(e) => setFirstName(e.target.value)} />
                    <span className={styles.authenticationLabel}
                    >{emailErrorMessage}</span>
                </div>

                <div className={styles.oneThirdWidthInputContainer}>
                    {<span style={displayLastNameInputLabel} className={`${styles.inputLabel} ${colour.lightGrayFont}`}
                    >Last Name</span>}
                    <input
                        className={colour.grayBorder}
                        type="Last Name"
                        value={lastName}
                        onFocus={() => setIsLastNameInputFocused(true)}
                        onBlur={() => setIsLastNameInputFocused(false)}
                        onChange={(e) => setLastName(e.target.value)} />
                    <span className={styles.authenticationLabel}
                    >{emailErrorMessage}</span>
                </div>

                {isAdmin &&
                    <div className={styles.selectContainer} >
                        <label>Role: </label>
                        <select value={role} onChange={changeRole}>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>}
            </div >
        </div>
    )
}