import auth from "../../styles/auth.module.css";
import colour from "../../styles/colour.module.css";
import { FC} from "react";
import { AuthFooterProps } from "../../interfaces/interfaces";

 export const SignupFooter: FC<AuthFooterProps> = ({ buttonDisabled, setPasswordErrorMessage }) => {
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