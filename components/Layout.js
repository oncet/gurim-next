import Head from "next/head";
import NextLink from "next/link";
import NextImage from "next/image";
import {
  Box,
  Heading,
  Image,
  Link,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

import logo from "../public/logo.png";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Gurim — Handcrafted</title>
        <meta name="description" content="Author of handcrafted products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Link as={NextLink} href="/">
          <a>
            <Image as={NextImage} src={logo} alt="Gurim logo" />
          </a>
        </Link>
        <Heading mb={2}>Gurim</Heading>
        <UnorderedList>
          <ListItem>
            <Link as={NextLink} href="https://shop.gurim.com.ar/">
              <a>Tienda</a>
            </Link>
          </ListItem>
          <ListItem>
            Catálogo
            <UnorderedList>
              <ListItem>
                <Link as={NextLink} href="/category/cuadernos">
                  <a>Cuadernos</a>
                </Link>
              </ListItem>
              <ListItem>
                <Link as={NextLink} href="/category/bolsos">
                  <a>Bolsos</a>
                </Link>
              </ListItem>
              <ListItem>
                <Link as={NextLink} href="/category/accesorios">
                  <a>Accesorios</a>
                </Link>
              </ListItem>
              <ListItem>
                <Link as={NextLink} href="/category/delantales">
                  <a>Delantales</a>
                </Link>
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Link as={NextLink} href="/nosotros">
              <a>Gurim</a>
            </Link>
          </ListItem>
          <ListItem>
            <Link as={NextLink} href="/contacto">
              <a>Contacto</a>
            </Link>
          </ListItem>
        </UnorderedList>
        <br />
        {children}
      </Box>
    </>
  );
};

export default Layout;
