import { useRouter } from "next/router";
import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { motion } from "framer-motion";

import Layout from "../components/Layout";

import "../wp-style.min.css";

const styles = {
  global: (props) => {
    return {
      body: {
        bg: mode("yellow.50", "gray.800")(props),
      },
      ".user-content": {
        p: {
          marginBottom: props.theme.space[4],
        },
        ul: {
          marginInlineStart: props.theme.space[10],
          marginBottom: props.theme.space[4],
          listStyleType: "square",
        },
        ".blocks-gallery-grid": {
          marginInlineStart: 0,
        },
        "@media screen and (max-width: 30em)": {
          ".blocks-gallery-item": {
            width: "100%",
            marginRight: 0,
          },
        },
        "@media screen and (max-width: 48em)": {
          "figure.alignleft": {
            width: "100%",
            marginRight: 0,
          },
          img: {
            width: "100%",
          },
        },
      },
    };
  },
};

const colors = {
  yellow: {
    50: "#fffef6",
    100: "#fef7b9",
    200: "#fff189",
    300: "#ffeb5a",
    400: "#ffe635",
    500: "#e6cc26",
    600: "#b39f1d",
    700: "#807113",
    800: "#4d4407",
    900: "#1a1700",
  },
};

const theme = extendTheme({
  colors,
  styles,
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.lg">
        <main>
          <Layout>
            <motion.div
              key={router.asPath}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >
              <Component {...pageProps} />
            </motion.div>
          </Layout>
        </main>
        {/* <footer>
          <p>Footer</p>
        </footer> */}
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
