import Head from "next/head";
import { chakra, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
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
  );
};

export default Layout;
