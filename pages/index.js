import { Heading, UnorderedList, ListItem, Container } from "@chakra-ui/react";
import Link from "next/link";

import { getGlobalData, getProductsForHome } from "../lib/api";
import Layout from "../components/Layout";

export default function Home({ globalData, products, preview }) {
  return (
    <>
      <Layout globalData={globalData}>
        <UnorderedList>
          {products.edges.map(({ node }) => (
            <ListItem key={node.id}>
              <Link href={`/product/${node.slug}`}>
                <a>{node.title}</a>
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const globalData = await getGlobalData();
  const products = await getProductsForHome(preview);

  return {
    props: { globalData, products, preview },
  };
}
