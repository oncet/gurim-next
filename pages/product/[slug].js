import Head from "next/head";
import { Heading, Stack } from "@chakra-ui/react";

import { getProduct, getProductsSlugs } from "../../lib/api";
import UserContent from "../../components/UserContent";
import Tags from "../../components/Tags";
import PageNotFound from "../../components/PageNotFound";

export default function Product({ product, preview }) {
  if (!product) {
    return <PageNotFound />;
  }

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

  return { paths, fallback: true };
}

export async function getStaticProps({ params, preview = false }) {
  const product = await getProduct(params.slug, preview);

  return {
    props: { product, preview },
  };
}
