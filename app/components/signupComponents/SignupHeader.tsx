import colour from "../../styles/colour.module.css";
import { FaCompass } from "react-icons/fa";
import signup from "../../styles/signup.module.css";

 export const SignupHeader = () => {
    return(
        <div className={`${signup.newAccountHeader} ${colour.orangeBackground}`}>
        <FaCompass className={colour.whiteFont} />
        <span>Create Account</span>
        <span>|</span> <span>Career Compass</span>
     </div>
    )
}