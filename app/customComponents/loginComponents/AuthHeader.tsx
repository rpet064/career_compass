import styles from "../../styles/auth.module.css";
import colour from "../../styles/colour.module.css";
import { FaCompass } from "react-icons/fa";

const AuthHeader = () => {
    return(
        <div className={`${styles.header} ${colour.orangeBackground}`}>
        <FaCompass className={colour.whiteFont} />
        <span>Sign In</span>
        <span>|</span> <span>Career Compass</span>
     </div>
    )
}

export default AuthHeader;