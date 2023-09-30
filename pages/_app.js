import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { supabase } from "../utils/supabase";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  function MyApp({ Component, pageProps }) {
    const { push, pathname } = useRouter();
    const validateSession = async () => {
      const user = supabase.auth.user();
      if (user && pathname === "/") {
        push("/dashboard");
      } else if (!user && pathname !== "/") {
        await push("/");
      }
    };
    supabase.auth.onAuthStateChange((event, _) => {
      if (event === "SIGNED_IN" && pathname === "/") {
        push("/dashboard");
      }
      if (event === "SIGNED_OUT") {
        push("/");
      }
    });
    useEffect(() => {
      validateSession();
    }, []);
    return (
      <>
        <Head>
          <title>サクッと3D</title>
          <link rel="icon" href="/3Dsakutto-logo.png" />
        </Head>
        {/* <QueryClientProvider client={queryClient}> */}
        <Component {...pageProps} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {/* </QueryClientProvider> */}
      </>
    );
  }
}

export default MyApp;
