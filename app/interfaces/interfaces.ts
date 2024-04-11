export interface AuthSignUpBodyProps {
    passwordErrorMessage: string | null;
    setPasswordErrorMessage: (passwordErrorMessage: string | null) => void;
    setButtonDisabled: (buttonDisabled: boolean) => void;
    setNewAccountContainerHeight: (loginContainerHeight: string) => void;
    username?: string;
    password?: string;
    email?: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
    setEmail: (email: string) => void;
    setTitle: (title: string) => void;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setRole: (role: string) => void;
}

export interface AuthLoginBodyProps {
    passwordErrorMessage: string | null;
    setPasswordErrorMessage: (passwordErrorMessage: string | null) => void;
    setButtonDisabled: (buttonDisabled: boolean) => void;
    setContainerHeight: (loginContainerHeight: string) => void;
    username?: string;
    password?: string;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
}
export interface AuthFooterProps {
    buttonDisabled: boolean;
    setPasswordErrorMessage: (message: string) => void;
    username?: string;
    password?: string;
}

export interface SignupFooterProps {
    buttonDisabled: boolean;
    setPasswordErrorMessage: (message: string) => void;
    username?: string;
    password?: string;
    email?: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}