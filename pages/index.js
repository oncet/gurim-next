import { UnorderedList, ListItem } from "@chakra-ui/react";
import Link from "next/link";

import { getProductsForHome } from "../lib/api";
import Layout from "../components/Layout";

export default function Home({ products, preview }) {
  return (
    <>
      <Layout>
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
  const products = await getProductsForHome(preview);

  return {
    props: { products, preview },
  };
}
