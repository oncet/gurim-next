import { useRouter } from "next/router";
import Script from "next/script";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

import theme from "../theme";
import Layout from "../components/Layout";

import "../wp-style.min.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
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
  );
}

export default MyApp;
