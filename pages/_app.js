import Head from "next/head";
import { useRouter } from "next/router";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

import theme from "../theme";
import Layout from "../components/Layout";
import previewImage from "../public/images/preview.jpg";

import "../wp-style.min.css";

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
        <Layout>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.asPath + router.isFallback}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.15,
              }}
            >
              {router.isFallback ? (
                <Center>
                  <Spinner size="xl" thickness={4} emptyColor="gray.200" />
                </Center>
              ) : (
                <Component {...pageProps} />
              )}
            </motion.div>
          </AnimatePresence>
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
