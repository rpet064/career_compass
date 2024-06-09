import styles from "../../styles/auth.module.css";
import colours from "../../styles/colour.module.css";
import { useNavigation } from "@/utility/navigation";

const AuthRedirectLink = () => {
    const navigate = useNavigation();
    return(
        <p>Create Account
        <span onClick={() => navigate('/create-account')}
        className={`${styles.redirectAuthSpan} ${colours.lightBlueFont}`}>Sign up here</span></p>
    )
}

export default AuthRedirectLink;