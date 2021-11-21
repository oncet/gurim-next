import { useState } from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

import Header from "./Header";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Gurim — Handcrafted</title>
        <meta name="description" content="Author of handcrafted products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Header />
        <br />
        <main>{children}</main>
      </Box>
    </>
  );
};

export default Layout;
