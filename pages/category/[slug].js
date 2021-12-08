import { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import NextImage from "next/image";
import {
  Button,
  Center,
  Text,
  Heading,
  Image,
  Link,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { getCategory, getCategoriesSlugs } from "../../lib/api";

const AnimatedGridItem = motion(GridItem);

export default function Category({ category, preview }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [moreResults, setMoreResults] = useState([]);
  const [endCursor, setEndCursor] = useState();
  const [hasNextPage, setHasNextPage] = useState(
    category.products.pageInfo.hasNextPage
  );

  const showMoreHandler = async () => {
    setIsSubmitting(true);

    const response = await getCategory(
      category.slug,
      endCursor || category.products.pageInfo.endCursor
    );

    setIsSubmitting(false);

    setMoreResults([...moreResults, ...response.products.edges]);
    setEndCursor(response.products.pageInfo.endCursor);
    setHasNextPage(response.products.pageInfo.hasNextPage);
  };

  return (
    <>
      <Head>
        <title>{category.name} — Gurim</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading fontWeight="200" mb={2} size="2xl">
        {category.name}
      </Heading>
      {category.products.edges && (
        <>
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
            ]}
            gap={6}
          >
            {[...category.products.edges, ...moreResults].map(({ node }) => (
              <AnimatedGridItem
                key={node.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                <Link as={NextLink} href={`/product/${node.slug}`}>
                  <a>
                    <NextImage
                      as={Image}
                      src={node.featuredImage.node.sourceUrl}
                      alt={node.title}
                      width={350}
                      height={350}
                      layout="responsive"
                    />
                    <Text>{node.title}</Text>
                  </a>
                </Link>
              </AnimatedGridItem>
            ))}
          </Grid>
          <Center mt="4">
            <Button
              isLoading={isSubmitting}
              variant="outline"
              onClick={showMoreHandler}
              disabled={isSubmitting || !hasNextPage}
              title={
                !hasNextPage && "No hay mas resultados para esta categoría"
              }
            >
              Mostrar mas
            </Button>
          </Center>
        </>
      )}
    </>
  );
}

export async function getStaticPaths() {
  const categories = await getCategoriesSlugs();

  const paths = categories.edges.map(({ node }) => ({
    params: { slug: node.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params, preview = false }) {
  const category = await getCategory(params.slug, null, preview);

  return {
    props: { category, preview },
  };
}
