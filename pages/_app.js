import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import Layout from "../components/Layout";
import previewImage from "../public/images/preview.jpg";

import "../wp-style.min.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Gurim — Hecho a mano</title>
        <meta name="description" content="Botánica y textil." />
        <meta
          key="og:title"
          property="og:title"
          content="Gurim — Hecho a mano"
        />
        <meta property="og:description" content="Botánica y textil." />
        <meta
          key="og:image"
          property="og:image"
          content={
            "https://" + process.env.NEXT_PUBLIC_VERCEL_URL + previewImage.src
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=UA-147454552-1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-147454552-1');
        `}
        </Script>
        <Layout>
          <div>
            {router.isFallback ? (
              <div>
                {/* <Spinner size="xl" thickness={4} emptyColor="gray.200" /> */}
                Loading...
              </div>
            ) : (
              <Component {...pageProps} />
            )}
          </div>
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
