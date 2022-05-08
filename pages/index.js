import Image from "next/image";
import NextLink from "next/link";
import {
  Grid,
  GridItem,
  Box,
  Heading,
  Container,
  VStack,
  Link,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <VStack spacing="7">
      <Container maxW="container.xl">
        <Box rounded="md" overflow="hidden" maxHeight={600}>
          <video width="1920" height="1080" muted autoPlay loop>
            <source
              src="https://admin.gurim.com.ar/wp-content/uploads/2022/05/intro.mp4"
              type="video/mp4"
            />
          </video>
        </Box>
      </Container>
      <Container maxW="container.lg">
        <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
          <GridItem>
            <NextLink passHref href="/category/fieltro">
              <Link>
                <Heading
                  fontWeight="200"
                  letterSpacing={1}
                  size="lg"
                  mb="4"
                  textAlign="center"
                >
                  Fieltro
                </Heading>
                <Box rounded="md" overflow="hidden">
                  <Image
                    src="https://admin.gurim.com.ar/wp-content/uploads/2021/09/IMG_2216-1200x800.jpg"
                    alt="Bolso de fieltro"
                    width={600}
                    height={400}
                    layout="responsive"
                    priority
                  />
                </Box>
              </Link>
            </NextLink>
          </GridItem>
          <GridItem>
            <NextLink passHref href="/category/ecoprint">
              <Link>
                <Heading
                  fontWeight="200"
                  letterSpacing={1}
                  size="lg"
                  mb="4"
                  textAlign="center"
                >
                  Ecoprint
                </Heading>
                <Box rounded="md" overflow="hidden">
                  <Image
                    src="https://admin.gurim.com.ar/wp-content/uploads/2020/10/IMG_8973-1200x800.jpg"
                    alt="Estuche y cuaderno decorados con ecoprint"
                    width={600}
                    height={400}
                    layout="responsive"
                    priority
                  />
                </Box>
              </Link>
            </NextLink>
          </GridItem>
        </Grid>
      </Container>
    </VStack>
  );
}
