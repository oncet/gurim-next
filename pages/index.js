import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  Spinner,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { getPosts } from "../lib/api";
import imageEscritorio from "../public/images/slideshow/escritorio.jpg";
import imageTelas2 from "../public/images/slideshow/telas-2.jpg";
import imageTelas from "../public/images/slideshow/telas.jpg";

const images = [imageEscritorio, imageTelas, imageTelas2];

const AnimatedBox = motion(Box);

export default function Home({ posts }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (currentSlide === images.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide((currentSlideValue) => currentSlideValue + 1);
      }
    }, 10000);

    return () => clearInterval(timerId);
  }, [currentSlide]);

  return (
    <Container maxW="container.xl">
      <VStack
        spacing={["8", "16"]}
        divider={<StackDivider borderColor="gray.200" />}
      >
        <Container maxW="container.xl" padding="0">
          <Box
            background="black"
            rounded="md"
            overflow="hidden"
            maxHeight={600}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <AnimatePresence exitBeforeEnter>
              <AnimatedBox
                key={images[currentSlide].src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                width="100%"
              >
                <Image
                  src={images[currentSlide]}
                  alt="Image"
                  layout="responsive"
                  fallback={<Spinner mx="auto" color="white" />}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </AnimatedBox>
            </AnimatePresence>
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
