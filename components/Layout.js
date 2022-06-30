import Head from "next/head";
import { chakra, Box, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Footer from "./Footer";

import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Gurim — Hecho a mano</title>
        <meta name="description" content="Author of handcrafted products" />
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
