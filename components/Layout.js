import { useState } from "react";
import Head from "next/head";
import { Box, Container, Stack } from "@chakra-ui/react";

import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Gurim — Handcrafted</title>
        <meta name="description" content="Author of handcrafted products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box pb="4">
        <Stack spacing="6">
          <Container maxW="container.lg">
            <Header />
          </Container>
          <main>{children}</main>
        </Stack>
      </Box>
    </>
  );
};

export default Layout;
