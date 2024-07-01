import styles from "../../styles/auth.module.css";
import colours from "../../styles/colour.module.css";
import { useAuthNavigation } from "@/utility/navigation";

 export const SignupRedirectLink = () => {
    const navigate = useAuthNavigation();
    return(
        <p>Have existing account?
        <span onClick={() => navigate('/login')}
        className={`${styles.redirectAuthSpan} ${colours.lightBlueFont}`}>Login here</span></p>
    )
}