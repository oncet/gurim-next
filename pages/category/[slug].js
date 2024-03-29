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

import { getCategory, getCategoriesSlugs } from "../../lib/api";

const AnimatedGridItem = motion(GridItem);

export default function Category({ category }) {
  const [endCursor, setEndCursor] = useState(
    category?.posts.pageInfo.endCursor
  );
  const [hasNextPage, setHasNextPage] = useState(
    category?.posts.pageInfo.hasNextPage
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState(category?.posts.edges);

  const showMoreHandler = async () => {
    setIsSubmitting(true);

    const response = await getCategory(category.slug, endCursor);

    setIsSubmitting(false);

    setItems([...items, ...response.posts.edges]);
    setEndCursor(response.posts.pageInfo.endCursor);
    setHasNextPage(response.posts.pageInfo.hasNextPage);
  };

  return (
    <>
      <Head>
        <title>{category.name} — Gurim</title>
        <meta
          key="og:title"
          property="og:title"
          content={`${category.name} — Gurim`}
        />
      </Head>
      <Container maxW="container.lg">
        <Stack spacing="4">
          <Heading fontWeight="200" size="2xl">
            {category.name}
          </Heading>
          {category.posts.edges && (
            <>
              <Grid
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(3, 1fr)",
                ]}
                gap={6}
              >
                {items.map(({ node }) => (
                  <AnimatedGridItem
                    key={node.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  >
                    <NextLink passHref href={`/${node.slug}`}>
                      <Link textUnderlineOffset="3px">
                        <Box rounded="md" overflow="hidden">
                          <NextImage
                            src={node.featuredImage.node.sourceUrl}
                            alt={node.title}
                            width={700}
                            height={700}
                            layout="responsive"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </Box>
                        <Text mt="2">{node.title}</Text>
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

export async function getStaticPaths() {
  const categories = await getCategoriesSlugs();

  const paths = categories.edges.map(({ node }) => ({
    params: { slug: node.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const category = await getCategory(params.slug);

  return {
    props: { category },
    notFound: !category,
    revalidate: 30,
  };
}
