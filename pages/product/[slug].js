import Head from "next/head";
import Link from "next/link";
import { HStack, Heading, Stack } from "@chakra-ui/react";

import { getProduct, getProductsSlugs } from "../../lib/api";
import UserContent from "../../components/UserContent";
import Tags from "../../components/Tags";

export default function Product({ product, preview }) {
  return (
    <>
      <Head>
        <title>{product.title} — Gurim</title>
      </Head>
      <Stack spacing="4">
        <Heading fontWeight="200" size="2xl">
          {product.title}
        </Heading>
        <Tags tags={product.categories.nodes} />
        <UserContent content={product.content} />
      </Stack>
    </>
  );
}

export async function getStaticPaths() {
  const products = await getProductsSlugs();

  const paths = products.edges.map(({ node }) => ({
    params: { slug: node.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params, preview = false }) {
  const product = await getProduct(params.slug, preview);

  return {
    props: { product, preview },
  };
}
