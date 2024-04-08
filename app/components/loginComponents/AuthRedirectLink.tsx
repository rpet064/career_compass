import styles from "../../styles/auth.module.css";
import colours from "../../styles/colour.module.css";
import { useNavigation } from "../../utility/navigation";

 export const AuthRedirectLink = () => {
    const navigate = useNavigation();
    return(
        <p>Create Account
        <span onClick={() => navigate('/create-account')}
        className={`${styles.newAccountSpan} ${colours.lightBlueFont}`}>Sign up here</span></p>
    )
}