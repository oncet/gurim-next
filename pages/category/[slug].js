import Head from "next/head";
import Link from "next/link";
import {
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";

import { getCategory, getCategoriesSlugs } from "../../lib/api";

export default function Category({ category, preview }) {
  return (
    <>
      <Head>
        <title>Category detail</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading mb={2}>{category.name}</Heading>
      <Breadcrumb mb={2}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/">
            <a>Home</a>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={Link} href={`/category/${category.slug}`}>
            {category.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
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
