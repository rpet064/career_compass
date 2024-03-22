import styles from "../styles/login.module.css";
import colours from "../styles/colour.module.css";

export default function Login() {
 return (
   <div className={`${styles.loginContainer} ${colours.grayBorder}`}>
       {/* Header */}
      <div className={`${styles.header} ${colours.orangeBackground}`}>
         <div>Icon goes here</div>
         <span>Sign In  |  Career Compass</span>
      </div>

      {/* Body */}
      <div className={styles.body}>
         <div>
            <span className={styles.inputLabel}>Login</span>
            <input></input>
         </div>
         <div>
            <span className={styles.inputLabel}>Password:</span>
            <input></input>
         </div>
      </div>

       {/* Footer */}
       <div className={styles.footer}>
       <button className={styles.loginButton}>Login</button>
      </div>
   </div>
 );
}