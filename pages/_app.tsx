import type { AppProps } from 'next/app';
import './app/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-amber/theme.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrimeReactProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </PrimeReactProvider>
  );
}