import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Heading, Stack, Container } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import {
  getPageUris,
  getPostUris,
  getPageByUri,
  getPostByUri,
} from "../lib/api";

import UserContent from "../components/UserContent";
import Tags from "../components/Tags";
import Lightbox from "../components/Lightbox";

export default function Page({ page, preview }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [imageLinks, setImageLinks] = useState([]);
  const userContentRef = useRef();

  useEffect(() => {
    setImageLinks(
      userContentRef.current.querySelectorAll(
        ".blocks-gallery-item a, .wp-block-image a"
      )
    );
  }, []);

  useEffect(() => {
    imageLinks.forEach((imageLink, index) => {
      imageLink.addEventListener("click", (event) => {
        event.preventDefault();

        const { src, alt } = imageLink.querySelector("img");

        setSelectedImage({ index, src, alt });
        setIsOpen(true);
      });
    });
  }, [imageLinks]);

  return (
    <>
      <Head>
        <title>{page.title} — Gurim</title>
      </Head>
      <Container maxW="container.lg">
        <Stack spacing="4">
          <Heading fontWeight="200" size="2xl">
            {page.title}
          </Heading>
          {page.categories && <Tags tags={page.categories.nodes} />}
          <UserContent ref={userContentRef} content={page.content} />
        </Stack>
      </Container>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Lightbox
              selectedImage={selectedImage}
              onNavigate={(key) => {
                let nextIndex;

                if (key === "ArrowLeft") {
                  nextIndex =
                    selectedImage.index > 0
                      ? selectedImage.index - 1
                      : imageLinks.length - 1;
                } else {
                  nextIndex =
                    selectedImage.index < imageLinks.length - 1
                      ? selectedImage.index + 1
                      : 0;
                }

                const { src, alt } = imageLinks[nextIndex].querySelector("img");

                setSelectedImage({ index: nextIndex, src, alt });
              }}
              onExit={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
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
