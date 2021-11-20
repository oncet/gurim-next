import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

import "../wp-style.min.css";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("yellow.50", "gray.800")(props),
    },
    ".user-content": {
      ul: {
        marginInlineStart: "1em",
      },
    },
  }),
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
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.lg">
        <main>
          <Component {...pageProps} />
        </main>
        {/* <footer>
          <p>Footer</p>
        </footer> */}
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
