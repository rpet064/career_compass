import type { AppProps } from 'next/app';
import '../app/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-amber/theme.css';
import { CookiesProvider } from 'react-cookie'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrimeReactProvider>
      <CookiesProvider>
      <ToastContainer />
      <Component {...pageProps} />
      </CookiesProvider>
    </PrimeReactProvider>
  );
}