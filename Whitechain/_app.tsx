import "../styles/globals.css";
import { AppProps } from "next/app";
import { AuthProvider } from '../context/AuthProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
