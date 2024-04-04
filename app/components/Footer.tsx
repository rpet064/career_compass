import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from '../styles/footer.module.css';
import colour from '../styles/colour.module.css';

export default function Navbar() {
    return (
        <div className={`${styles.footer} ${colour.lightGrayBoxShadow} ${colour.orangeBackground}`}>
            <a href="https://github.com/rpet064" target="_blank" rel="noopener noreferrer">
                <FiGithub title="Github" />
            </a>
            <a href="https://www.linkedin.com/in/robert-pether-ba9968113" target="_blank" rel="noopener noreferrer">
                <FiLinkedin title="Linkedin" />
            </a>
            <a href="mailto:rpether@hotmail.co.nz" target="_blank">
                <FiMail title="Email" />
            </a>
        </div>
    );
}