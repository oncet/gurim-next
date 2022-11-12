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
  Text,
  StackDivider,
} from "@chakra-ui/react";
import { getPosts } from "../lib/api";

export default function Home({ posts }) {
  return (
    <Container maxW="container.xl">
      <VStack
        spacing={["8", "16"]}
        divider={<StackDivider borderColor="gray.200" />}
      >
        <Container maxW="container.xl" padding="0">
          <Box rounded="md" overflow="hidden" maxHeight={600}>
            <video width="1920" height="1080" muted autoPlay loop>
              <source src="/intro.mp4" type="video/mp4" />
            </video>
          </Box>
        </Container>
        <Container maxW="container.lg" padding="0">
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(4, 1fr)",
            ]}
            gap={6}
          >
            {posts.nodes.map(({ id, title, slug, featuredImage }) => (
              <GridItem key={id}>
                <NextLink passHref href={`/${slug}`}>
                  <Link textUnderlineOffset="3px">
                    <Box rounded="md" overflow="hidden">
                      <Image
                        src={featuredImage.node.sourceUrl}
                        alt={title}
                        width={700}
                        height={700}
                        layout="responsive"
                      />
                    </Box>
                    <Text mt="2">{title}</Text>
                  </Link>
                </NextLink>
              </GridItem>
            ))}
          </Grid>
        </Container>
        <Container maxW="container.xl" padding="0">
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
                      src="/images/fieltro.jpg"
                      alt="Proceso de fieltrado"
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
                      src="/images/ecoprint.jpg"
                      alt="Tela con ecoprint"
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
    </Container>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: { posts },
    notFound: !posts,
    revalidate: 30,
  };
}
