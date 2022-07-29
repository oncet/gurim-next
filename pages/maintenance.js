import Head from "next/head";
import { Container, Heading, Stack, Text } from "@chakra-ui/react";

export default function Maintenance() {
  return (
    <>
      <Head>
        <title>Vuelvo pronto — Gurim</title>
      </Head>
      <Container maxW="container.lg">
        <Stack spacing="4">
          <Heading fontWeight="200" size="2xl" textAlign="center">
            ¡Volvemos pronto!
          </Heading>
          <Text fontSize="3xl" textAlign="center">
            :)
          </Text>
        </Stack>
      </Container>
    </>
  );
}
