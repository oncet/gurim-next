import Head from "next/head";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";

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
        <Transition
          show
          appear
          key={router.asPath + router.isFallback}
          enter="transition-all"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-all"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="duration-500"
        >
          {router.isFallback ? (
            <div className="flex items-center justify-center">
              <svg
                viewBox="0 0 60 60"
                className="w-20 h-w-20 animate-spin duration-75"
              >
                <circle
                  cx="30"
                  cy="30"
                  r="25"
                  className="stroke-gray-200"
                  fill="transparent"
                  strokeWidth="5"
                />
                <path
                  d="M 30 5 A 25 25 0 0 1 55 30"
                  className="stroke-gray-800"
                  fill="transparent"
                  strokeWidth="5"
                />
              </svg>
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </Transition>
      </Layout>
    </>
  );
}

export default MyApp;
