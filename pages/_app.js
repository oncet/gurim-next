import Head from "next/head";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";

import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
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
        {router.isFallback ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </>
  );
}

export default MyApp;
