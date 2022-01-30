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
        <Grid templateColumns={["repeat(1, 1fr)"]} gap={6}>
          <GridItem>
            <Heading fontWeight="200" size="2xl" mb="4" textAlign="center">
              Handcrafted
            </Heading>
            <Box rounded="md" overflow="hidden">
              <Image
                src="https://gurim.com.ar/wp-content/uploads/2021/12/manos-scaled.jpg"
                alt=""
                width={960}
                height={640}
                layout="responsive"
              />
            </Box>
          </GridItem>
        </Grid>
      </Container>
      <Container maxW="container.lg">
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
          ]}
          gap={6}
        >
          <GridItem>
            <Heading fontWeight="200" size="xl" mb="4" textAlign="center">
              <NextLink passHref href="/category/fieltro"><Link>Fieltro</Link></NextLink>
            </Heading>
            <NextLink href="/category/fieltro" passHref>
              <Link>
                <Box rounded="md" overflow="hidden">
                  <Image
                    src="https://gurim.com.ar/wp-content/uploads/2021/09/IMG_2216-1200x800.jpg"
                    alt="asd"
                    width={600}
                    height={400}
                    layout="responsive"
                  />
                </Box>
              </Link>
            </NextLink>
          </GridItem>
          <GridItem>
            <Heading fontWeight="200" size="xl" mb="4" textAlign="center">
              Ecoprint
            </Heading>
            <Box rounded="md" overflow="hidden">
              <Image
                src="https://gurim.com.ar/wp-content/uploads/2020/10/IMG_8973-1200x800.jpg"
                alt=""
                width={600}
                height={400}
                layout="responsive"
              />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </VStack>
  );
}
