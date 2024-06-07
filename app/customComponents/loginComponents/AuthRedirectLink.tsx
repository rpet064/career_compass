import styles from "@app/styles/auth.module.css";
import colours from "@app/styles/colour.module.css";
import { useNavigation } from "../../utility/navigation";

 export const AuthRedirectLink = () => {
    const navigate = useNavigation();
    return(
        <p>Create Account
        <span onClick={() => navigate('/create-account')}
        className={`${styles.redirectAuthSpan} ${colours.lightBlueFont}`}>Sign up here</span></p>
    )
}