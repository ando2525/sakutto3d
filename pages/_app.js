import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>サクッと3D</title>
        <link rel="icon" href="/3Dsakutto-logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
