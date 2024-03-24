import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Navbar() {
 return (
   <div>
   <a href="https://github.com/rpet064">
       <FiGithub title="Github" />
   </a>
   <a href="https://www.linkedin.com/in/robert-pether-ba9968113">
       <FiLinkedin title="Linkedin" />
   </a>
   <a href="mailto:rpether@hotmail.co.nz">
       <FiMail title="Email" />
   </a>
</div>
 );
}