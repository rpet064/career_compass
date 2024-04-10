import colour from "../../styles/colour.module.css";
import signup from "../../styles/signup.module.css";
import auth from "../../styles/auth.module.css";
import { FaCompass } from "react-icons/fa";

 export const SignupHeader = () => {
    return(
        <div className={`${signup.newAccountHeader} ${auth.newAccountHeader} ${colour.orangeBackground}`}>
        <FaCompass className={colour.whiteFont} />
        <span>Create Account</span>
        <span>|</span> <span>Career Compass</span>
     </div>
    )
}