// loaded on every page change
// Component that access every page through Component
import { AppProps } from "next/app";
import "../styles/global.scss";
import { Header } from "../components/Header";
import { Provider as AuthProvider } from "next-auth/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
