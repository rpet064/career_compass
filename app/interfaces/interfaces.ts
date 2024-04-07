export interface AuthFooterProps {
    buttonDisabled: boolean;
    setPasswordErrorMessage: (message: string) => void;
    isLoginScreen: boolean;
}

export interface AuthHeaderProps {
    isLoginScreen: boolean;
}

export interface AuthSignUpBodyProps {
    isLoginScreen: boolean;
    setIsLoginScreen: (isLoginScreen: boolean) => void;
    passwordErrorMessage: string | null;
    setPasswordErrorMessage: (passwordErrorMessage: string | null) => void;
    setButtonDisabled: (buttonDisabled: boolean) => void;
    setNewAccountContainerHeight: (loginContainerHeight: string) => void;
}

export interface AuthRedirectLinkProps {
    isLoginScreen: boolean;
    setIsLoginScreen: (isLoginScreen: boolean) => void;
}


export interface AuthLoginBodyProps {
    isLoginScreen: boolean;
    setIsLoginScreen: (isLoginScreen: boolean) => void;
    passwordErrorMessage: string | null;
    setPasswordErrorMessage: (passwordErrorMessage: string | null) => void;
    setButtonDisabled: (buttonDisabled: boolean) => void;
    setContainerHeight: (loginContainerHeight: string) => void;
}

export interface AuthUsernameContainerProps {
    displayUsernameInputLabel: { display: string };
    setIsUsernameInputFocused: (isFocused: boolean) => void;
    setUsername: (username: string) => void;
    usernameErrorMessage: string | null;
    username: string | undefined;
    isLoginPage: boolean;
}

export interface AuthPasswordContainerProps {
    password: string | undefined;
    setPassword: (password: string) => void;
    passwordErrorMessage: string | null;
    setIsPasswordInputFocused: (isPasswordInputFocused: boolean) => void;
    isPasswordInputFocused: boolean;
    displayPasswordInputLabel: { display: string };
    isLoginPage: boolean;
}
