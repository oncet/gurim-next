import { ChakraProvider, Container } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Container>
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
