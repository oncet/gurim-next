import { forwardRef } from "react";
import NextLink from "next/link";
import { Heading, Stack, Container, Text, Link } from "@chakra-ui/react";
import Head from "next/head";

const WrappedLink = forwardRef(({ children, ...props }, ref) => (
  <Link display="inline-block" py="2" {...props} ref={ref}>
    {children}
  </Link>
));
WrappedLink.displayName = "WrappedLink";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Página no encontrada — Gurim</title>
      </Head>
      <Container maxW="container.lg">
        <Stack spacing="4">
          <Heading fontWeight="200" size="2xl" textAlign="center">
            Página no encontrada :(
          </Heading>
          <Text textAlign="center">
            Si cree que se trata de un error, por favor póngase en{" "}
            <NextLink passHref href="/contacto">
              <WrappedLink>contacto</WrappedLink>
            </NextLink>
            .
          </Text>
        </Stack>
      </Container>
    </>
  );
}
