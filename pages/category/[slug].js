import { useState } from "react";
import Head from "next/head";
import { Heading, Stack } from "@chakra-ui/react";

import { getCategory, getCategoriesSlugs } from "../../lib/api";
import ItemsGrid from "../../components/ItemsGrid";

export default function Category({ category, preview }) {
  console.log("category", category);

  return (
    <>
      <Head>
        <title>{category.name} — Gurim</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack spacing="4">
        <Heading fontWeight="200" size="2xl">
          {category.name}
        </Heading>
        {category.products.edges && (
          <ItemsGrid
            initialItems={category.products}
            prefix="/product/"
            slug={category.slug}
          />
        )}
        {category.posts.edges && (
          <>
            <Heading fontWeight="200" size="xl" mt="2">
              Blog
            </Heading>
            <ItemsGrid
              initialItems={category.posts}
              prefix="/"
              slug={category.slug}
            />
          </>
        )}
      </Stack>
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
