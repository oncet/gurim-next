import Head from "next/head";
import { Heading, Stack } from "@chakra-ui/react";

import { getProduct, getProductsSlugs } from "../../lib/api";
import UserContent from "../../components/UserContent";
import Tags from "../../components/Tags";

export default function Product({ product }) {
  return (
    <>
      <Head>
        <title>{product.title} — Gurim</title>
        <meta
          key="og:title"
          property="og:title"
          content={`${product.title} — Gurim`}
        />
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

export async function getStaticProps({ params }) {
  const product = await getProduct(params.slug);

  return {
    props: { product },
    notFound: !product,
    revalidate: 30,
  };
}
