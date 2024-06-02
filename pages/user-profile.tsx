import Navbar from "../app/customComponents/Navbar";
import Footer from "../app/customComponents/Footer";
import { checkAuth } from '../app/utility/checkAuth';
import UserProps from "@/app/interfaces/userProps";
import { NextPageContext } from 'next';

  export default function UserProfile({  userid, username }: UserProps) {
    return (
      <main>
      <Navbar userid={userid} />
      <section>
        <h1>This is the user profile</h1>
        <div>Welcome, {username}!</div>
      </section>
      <Footer />
      </main>
    );
}

export async function getServerSideProps(context: NextPageContext) {
  return checkAuth(context);
 }