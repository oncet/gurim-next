import Head from "next/head";
import { useRouter } from "next/router";

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
      <Layout>
        <div>
          {router.isFallback ? (
            <div className="flex items-center justify-center">
              {/* <Spinner size="xl" thickness={4} emptyColor="gray.200" /> */}
              Loading...
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </div>
      </Layout>
    </>
  );
}

export default MyApp;
