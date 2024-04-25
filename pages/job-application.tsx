import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import { checkAuth } from '../app/utility/checkAuth';
import UserProps from "@/app/interfaces/userProps";
import { NextPageContext } from 'next';

  export default function JobApplication({ user }: UserProps) {
    return (
      <main>
      <Navbar user={user.userid} />
      <section>
        <h1>This is the job application</h1>
        <div>Welcome, {user.username}!</div>
      </section>
      <Footer />
      </main>
    );
}

export async function getServerSideProps(context: NextPageContext) {
  return checkAuth(context);
 }