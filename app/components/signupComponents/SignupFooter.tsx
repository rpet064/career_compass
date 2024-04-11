import auth from "../../styles/auth.module.css";
import colour from "../../styles/colour.module.css";
import { FC } from "react";
import { SignupFooterProps } from "../../interfaces/interfaces";

 export const SignupFooter: FC<SignupFooterProps> = ({ 
    buttonDisabled, setPasswordErrorMessage, username, password, email, title, firstName, lastName, role }) => {
     const createNewAccount = () => {
        setPasswordErrorMessage("Test");
        return
     }

    return(
        <div className={auth.loginFooter}>
        <button className={colour.grayBorder} disabled={buttonDisabled}
            onClick={() => createNewAccount()}>Create Account</button>
     </div>
    )
}