import styles from "../styles/auth.module.css";
import { InputText } from 'primereact/inputtext';
import colour from "../styles/colour.module.css";
import auth from "../styles/auth.module.css";
import { FC, useState, useEffect } from "react";
import { SignupRedirectLink } from "./signupComponents/SignupRedirectLink";
import signup from "../styles/signup.module.css";
import AuthSignupBodyProps from "../interfaces/authSignupBodyProps";
import { useAuthNavigation } from "../utility/navigation";
import { errorMessage, successMessage } from "../utility/toastMessages";

const AuthSignUpBody: FC<AuthSignupBodyProps> = (setContainerHeight) => {

    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);
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

    const navigate = useAuthNavigation();

    // Manage username error message
    useEffect(() => {
        if (formData.username === undefined) {
            setUsernameErrorMessage(null);
            return;
        }
        formData.username.length > 0 ? setUsernameErrorMessage(null) : setUsernameErrorMessage("Username is required");
    }, [formData.username]);

    // Manage password error message
    useEffect(() => {
        if (formData.password === undefined) {
            setPasswordErrorMessage(null);
            return;
        }
        formData.password.length > 0 ? setPasswordErrorMessage(null) : setPasswordErrorMessage("Password is required");
    }, [formData.password, setPasswordErrorMessage]);

    // Manage button validation
    useEffect(() => {
        if (formData.username !== undefined && formData.password !== undefined && formData.username.length > 0 && formData.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [formData.username, formData.password, setButtonDisabled]);

    
    // Check if error messages are all empty
    useEffect(() => {
        var userDetailsvalid = usernameErrorMessage?.trim().length === 0
        && emailErrorMessage?.trim().length === 0
        && passwordErrorMessage?.trim().length === 0;
        setButtonDisabled(userDetailsvalid);
    }, [usernameErrorMessage, emailErrorMessage, passwordErrorMessage ]);

    // Check if password matches confirm password
    useEffect(() => {
        // User hasn't entered password
        if (!formData.password && !formData.confirmPassword) {
            return;
        }

        // Check if passwords matches
        let passwordsMatch = formData.password !== formData.confirmPassword
        if (passwordsMatch) {
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
                <InputText
                    className={colour.grayBorder}
                    type="username"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange} />

                <InputText
                    className={colour.grayBorder}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange} />

                <InputText
                    className={colour.grayBorder}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange} />

                <InputText
                    className={colour.grayBorder}
                    type="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange} />

                <InputText
                    className={colour.grayBorder}
                    type="Title"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange} />

                <InputText
                    className={colour.grayBorder}
                    type="First Name"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange} />

                <InputText
                    className={colour.grayBorder}
                    type="Last Name"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange} />

                    <div className={auth.errorMessagesContainer}>
                        <span className={styles.authenticationLabel}>{usernameErrorMessage}</span>
                        <span className={styles.authenticationLabel}>{emailErrorMessage}</span>
                        <span className={styles.authenticationLabel}>{passwordErrorMessage}</span>
                    </div>

                {/* Footer */}
                <div className={auth.loginFooter}>
                    <button type="submit" className={`${auth.authButton} ${colour.orangeBackground} ${colour.grayBorder} ${colour.lightGrayBoxShadow}`} disabled={buttonDisabled}>Create</button>
                </div>
            </form>
        </div>
    )
}

export default AuthSignUpBody;