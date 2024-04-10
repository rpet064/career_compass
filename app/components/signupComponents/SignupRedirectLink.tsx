import styles from "../../styles/auth.module.css";
import colours from "../../styles/colour.module.css";
import { useNavigation } from "../../utility/navigation";

 export const SignupRedirectLink = () => {
    const navigate = useNavigation();
    return(
        <p>Have existing account?
        <span onClick={() => navigate('/login')}
        className={`${styles.redirectAuthSpan} ${colours.lightBlueFont}`}>Login here</span></p>
    )
}