import styles from "../styles/auth.module.css";
import globals from "../styles/global.module.css";
import colour from "../styles/colour.module.css";
import { FC, useState, useEffect } from "react";
import { SignupRedirectLink } from "./signupComponents/SignupRedirectLink";
import { AuthSignUpBodyProps } from "../interfaces/interfaces";
import signup from "../styles/signup.module.css";

export const AuthSignUpBody: FC<AuthSignUpBodyProps> = ({
    passwordErrorMessage, setPasswordErrorMessage, setNewAccountContainerHeight,
    username, password, email, title, firstName, lastName, role,
    setUsername, setPassword, setEmail, setTitle, setFirstName, setLastName, setRole }) => {

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
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

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

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        title: '',
        firstName: '',
        lastName: '',
        role: '',
     });
    
     const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
     };
    
     const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await fetch('/api/authentication/createAccount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('Account created:', data);
          // Optionally, clear the form or redirect the user
        } else {
          console.error('Error creating account:', await response.text());
        }
     };

    return (
        <div className={signup.newAccountBody}>
            <SignupRedirectLink />

            <form className={signup.newAccountInputContainer}>
                <div className={globals.halfWidthInputContainer}>
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

                <div className={globals.halfWidthInputContainer}>
                    {<span style={displayEmailInputLabel} className={`${styles.inputLabel} 
                    ${globals.secondHalfWidthInputLabel} ${colour.lightGrayFont}`}
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

                <div className={globals.halfWidthInputContainer}>
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

                <div className={globals.oneThirdWidthInputContainer}>
                    {<span style={displayTitleInputLabel} className={`${styles.inputLabel} 
                    ${globals.secondHalfWidthInputLabel} ${colour.lightGrayFont}`}
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

                <div className={globals.oneThirdWidthInputContainer}>
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

                <div className={globals.oneThirdWidthInputContainer}>
                    {<span style={displayLastNameInputLabel} className={`${styles.inputLabel} 
                    ${globals.secondThirdWidthInputLabel} ${colour.lightGrayFont}`}
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
                    <div className={signup.selectContainer} >
                        <label>Role: </label>
                        <select value={role} onChange={changeRole}>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>}
            <button type="submit" className={colour.grayBorder} disabled={buttonDisabled}>Create Account</button>
            </form>
        </div>
    )
}