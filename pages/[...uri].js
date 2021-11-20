import { Box, Heading } from "@chakra-ui/react";

import {
  getPageUris,
  getPostUris,
  getPageByUri,
  getPostByUri,
} from "../lib/api";
import Layout from "../components/Layout";

const createMarkup = (htmlContent) => {
  return { __html: htmlContent };
};

export default function Nosotros({ page, preview }) {
  return (
    <>
      <Layout>
        <Heading>{page.title}</Heading>
        <Box
          className="user-content"
          dangerouslySetInnerHTML={createMarkup(page.content)}
        />
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const pageUris = await getPageUris();
  const postUris = await getPostUris();

  const paths = [...postUris.edges, ...pageUris.edges].map(({ node }) => ({
    params: {
      uri: node.uri.split("/").filter(Boolean),
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params, preview = false }) {
  const uri = `/${params.uri.join("/")}/`;

  const page = await getPageByUri(uri);
  const post = await getPostByUri(uri);

  return {
    props: { page: page || post, preview },
  };
}
