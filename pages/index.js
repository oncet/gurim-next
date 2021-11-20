import { UnorderedList, ListItem } from "@chakra-ui/react";
import Link from "next/link";

import { getProductsForHome } from "../lib/api";

export default function Home({ products, preview }) {
  return (
    <UnorderedList>
      {products.edges.map(({ node }) => (
        <ListItem key={node.id}>
          <Link href={`/product/${node.slug}`}>
            <a>{node.title}</a>
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
  );
}

export async function getStaticProps({ preview = false }) {
  const products = await getProductsForHome(preview);

  return {
    props: { products, preview },
  };
}
