import styles from "../styles/auth.module.css";
import globals from "../styles/global.module.css";
import colour from "../styles/colour.module.css";
import { FC, useState, useEffect } from "react";
import { SignupRedirectLink } from "./signupComponents/SignupRedirectLink";
import signup from "../styles/signup.module.css";
import { AuthLoginBodyProps } from "../interfaces/interfaces";

export const AuthSignUpBody: FC<AuthLoginBodyProps> = (setContainerHeight) => {

    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

    const [isAdmin, setIsAdmin] = useState<boolean>(true);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    // // Increase container width if displaying error message
    // useEffect(() => {
    //     if (usernameErrorMessage !== null || passwordErrorMessage !== null) {
    //         setNewAccountContainerHeight("52.5%");
    //     } else {
    //         setNewAccountContainerHeight("50%");
    //     }
    // }, [usernameErrorMessage, passwordErrorMessage, setNewAccountContainerHeight]);

    // // Manage username error message
    // useEffect(() => {
    //     if (username === undefined) {
    //         setUsernameErrorMessage(null);
    //         return;
    //     }
    //     username.length > 0 ? setUsernameErrorMessage(null) : setUsernameErrorMessage("This field is required");
    // }, [username]);

    // // Manage password error message
    // useEffect(() => {
    //     if (password === undefined) {
    //         setPasswordErrorMessage(null);
    //         return;
    //     }
    //     password.length > 0 ? setPasswordErrorMessage(null) : setPasswordErrorMessage("This field is required");
    // }, [password, setPasswordErrorMessage]);

    // // Manage button validation
    // useEffect(() => {
    //     if (username !== undefined && password !== undefined && username.length > 0 && password.length > 0) {
    //         setButtonDisabled(false);
    //     } else {
    //         setButtonDisabled(true);
    //     }
    // }, [username, password, setButtonDisabled]);

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

            <form onSubmit={handleSubmit} className={signup.newAccountInputContainer}>
                <div className={globals.halfWidthInputContainer}>
                    <input
                        className={colour.grayBorder}
                        type="username"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}/>
                    <span className={styles.authenticationLabel}
                    >{usernameErrorMessage}</span>
                </div>

                <div className={globals.halfWidthInputContainer}>
                    <input
                        className={colour.grayBorder}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}/>
                    <span className={styles.authenticationLabel}
                    >{emailErrorMessage}</span>
                </div>

                <div className={globals.halfWidthInputContainer}>
                    <input
                        className={colour.grayBorder}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}/>
                    <span className={styles.authenticationLabel}
                    >{passwordErrorMessage}</span>
                </div>

                <div className={globals.oneThirdWidthInputContainer}>
                    <input
                        className={colour.grayBorder}
                        type="Title"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}/>
                    <span className={styles.authenticationLabel}
                    >{emailErrorMessage}</span>
                </div>

                <div className={globals.oneThirdWidthInputContainer}>
                    <input
                        className={colour.grayBorder}
                        type="First Name"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}/>
                        <span className={styles.authenticationLabel}
                    >{emailErrorMessage}</span>
                </div>

                <div className={globals.oneThirdWidthInputContainer}>
                    <input
                        className={colour.grayBorder}
                        type="Last Name"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}/>
                    <span className={styles.authenticationLabel}
                    >{emailErrorMessage}</span>
                </div>
            <button type="submit" className={colour.grayBorder} disabled={buttonDisabled}>Create Account</button>
            </form>
        </div>
    )
}