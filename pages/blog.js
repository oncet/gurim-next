import { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import NextImage from "next/image";
import {
  Heading,
  Button,
  Center,
  Text,
  Box,
  Stack,
  Grid,
  GridItem,
  Link,
  Container,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { getPosts } from "../lib/api";

const AnimatedGridItem = motion(GridItem);

export default function Blog({ posts }) {
  const [endCursor, setEndCursor] = useState(posts?.pageInfo.endCursor);
  const [hasNextPage, setHasNextPage] = useState(posts?.pageInfo.hasNextPage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState(posts?.nodes);

  const showMoreHandler = async () => {
    setIsSubmitting(true);

    const response = await getPosts(endCursor, 6);

    setIsSubmitting(false);

    setItems([...items, ...response.nodes]);
    setEndCursor(response.pageInfo.endCursor);
    setHasNextPage(response.pageInfo.hasNextPage);
  };

  return (
    <>
      <Head>
        <title>Blog — Gurim</title>
      </Head>
      <Container maxW="container.lg">
        <Stack spacing="4">
          <Heading fontWeight="200" size="2xl">
            Blog
          </Heading>
          {posts.nodes && (
            <>
              <Grid
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(3, 1fr)",
                ]}
                gap={6}
              >
                {items.map(({ slug, featuredImage, title }) => (
                  <AnimatedGridItem
                    key={slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  >
                    <NextLink passHref href={`/${slug}`}>
                      <Link textUnderlineOffset="3px">
                        <Box rounded="md" overflow="hidden">
                          <NextImage
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
                  </AnimatedGridItem>
                ))}
              </Grid>
              {hasNextPage && (
                <Center mt="2">
                  <Button
                    isLoading={isSubmitting}
                    variant="ghost"
                    onClick={showMoreHandler}
                    disabled={isSubmitting}
                    fontWeight="400"
                  >
                    Mostrar mas
                  </Button>
                </Center>
              )}
            </>
          )}
        </Stack>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getPosts(undefined, 6);

  return {
    props: { posts },
    notFound: !posts,
    revalidate: 30,
  };
}
