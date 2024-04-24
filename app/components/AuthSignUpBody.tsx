import styles from "../styles/auth.module.css";
import globals from "../styles/global.module.css";
import colour from "../styles/colour.module.css";
import auth from "../styles/auth.module.css";
import { FC, useState, useEffect } from "react";
import { SignupRedirectLink } from "./signupComponents/SignupRedirectLink";
import signup from "../styles/signup.module.css";
import AuthSignupBodyProps from "../interfaces/authSignupBodyProps";
import { useNavigation } from "../../app/utility/navigation";
import { errorMessage, successMessage } from "../../app/utility/toastMessages";

export const AuthSignUpBody: FC<AuthSignupBodyProps> = (setContainerHeight) => {

    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

    // Validation
    let [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        title: "",
        firstName: "",
        lastName: "",
        role: "",
        confirmPassword: "",
    });

    const navigate = useNavigation();

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

    // Currently disable button if passwords don't match
    // TODO: implement full validation
    useEffect(() => {
        setButtonDisabled(passwordsMatch);
    }, [passwordsMatch, setButtonDisabled]);

    // Check if password matches confirm password
    useEffect(() => {
        // User hasn't entered password
        if(!formData.password && !formData.confirmPassword){
            return;
        }

        // Check if passwords matches
        let passwordsMatch = formData.password !== formData.confirmPassword
        if(passwordsMatch){
            setPasswordErrorMessage("");
            return;
        }
        setPasswordErrorMessage("Passwords need to match");
    }, [formData]);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        const response = await fetch("/api/authentication/createAccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            // successMessage("Account created successfully");
            navigate('/login');
        } else {
            // errorMessage(`Error creating account:, ${await data.text()}`);
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
                        onChange={handleChange} />
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
                        onChange={handleChange} />
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
                        onChange={handleChange} />
                    <span className={styles.authenticationLabel}
                    >{passwordErrorMessage}</span>
                </div>

                <div className={globals.halfWidthInputContainer}>
                    <input
                        className={colour.grayBorder}
                        type="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange} />
                    <span className={styles.authenticationLabel}
                    >{passwordErrorMessage}</span>
                </div>

                <div className={globals.thirdWidthInputContainer}>
                    <input
                        className={colour.grayBorder}
                        type="Title"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange} />
                    <span className={styles.authenticationLabel}
                    >{emailErrorMessage}</span>
                </div>

                <div className={globals.thirdWidthInputContainer}>
                    <input
                        className={colour.grayBorder}
                        type="First Name"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange} />
                    <span className={styles.authenticationLabel}
                    >{emailErrorMessage}</span>
                </div>

                <div className={globals.thirdWidthInputContainer}>
                    <input
                        className={colour.grayBorder}
                        type="Last Name"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange} />
                    <span className={styles.authenticationLabel}
                    >{emailErrorMessage}</span>
                </div>

                {/* Footer */}
                <div className={auth.loginFooter}>
                    <button type="submit" className={`${auth.authButton} ${colour.grayBorder}`}
                        disabled={buttonDisabled}>Create Account</button>
                </div>
            </form>
        </div>
    )
}