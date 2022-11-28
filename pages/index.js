import {
  Box,
  Grid,
  GridItem,
  Heading,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { getPosts } from "../lib/api";
import imageEscritorio from "../public/images/slideshow/escritorio.jpg";
import imageTelas2 from "../public/images/slideshow/telas-2.jpg";
import imageTelas from "../public/images/slideshow/telas.jpg";

const images = [imageEscritorio, imageTelas, imageTelas2];

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
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col gap-8 md:gap-16 px-4">
        <div className="mx-auto w-full">
          <div className="max-h-[600px] overflow-hidden rounded-md flex items-center justify-center bg-black">
            <div className="w-full">
              <Image
                src={images[currentSlide]}
                alt="Image"
                layout="responsive"
                // fallback={<Spinner mx="auto" color="white" />}
              />
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200" />
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          </div>
        </div>
        <div className="border-b border-gray-200" />
        <div className="mx-auto w-full">
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
        </div>
      </div>
    </div>
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
