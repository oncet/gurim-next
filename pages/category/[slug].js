import Head from "next/head";
import NextLink from "next/link";
import NextImage from "next/image";
import { Text, Heading, Image, Link, Grid, GridItem } from "@chakra-ui/react";

import { getCategory, getCategoriesSlugs } from "../../lib/api";

export default function Category({ category, preview }) {
  console.log("category", category);
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
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={6}
        >
          {category.products.edges.map(({ node }) => (
            <GridItem key={node.slug}>
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
            </GridItem>
          ))}
        </Grid>
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
  const category = await getCategory(params.slug, preview);

  return {
    props: { category, preview },
  };
}
