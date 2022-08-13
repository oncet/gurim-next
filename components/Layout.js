import Head from "next/head";
import { chakra, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";

import previewImage from "../public/images/preview.jpg";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Gurim — Hecho a mano</title>
        <meta name="description" content="Botánica y textil." />
        <meta property="og:title" content="Gurim — Hecho a mano" />
        <meta property="og:description" content="Botánica y textil." />
        <meta
          property="og:image"
          content={
            "https://" + process.env.NEXT_PUBLIC_VERCEL_URL + previewImage.src
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        <Stack spacing="10" minHeight="100vh">
          <Header />
          <chakra.main flexGrow={1}>{children}</chakra.main>
          <Footer />
        </Stack>
      </motion.div>
    </>
  );
};

export default Layout;
