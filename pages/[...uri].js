import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  Box,
  Heading,
  Stack,
  Container,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import {
  getPageUris,
  getPostUris,
  getPageByUri,
  getPostByUri,
} from "../lib/api";

import UserContent from "../components/UserContent";
import Tags from "../components/Tags";

export default function Page({ page, preview }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState();
  const galleryImagesRef = useRef([]);
  const userContentRef = useRef();

  useEffect(() => {
    galleryImagesRef.current = userContentRef.current.querySelectorAll(
      ".blocks-gallery-item a img"
    );

    const imageLinks = userContentRef.current.querySelectorAll(
      ".blocks-gallery-item a"
    );

    imageLinks.forEach((imageLink, index) => {
      imageLink.addEventListener("click", (event) => {
        event.preventDefault();

        setCurrentImage(index);
        setIsOpen(true);
      });
    });
  }, []);

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
            <Box
              background="rgba(0, 0, 0, 0.8)"
              position="fixed"
              top={0}
              left={0}
              height="100%"
              width="100%"
              onClick={() => setIsOpen(false)}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                maxH="100%"
                src={galleryImagesRef.current[currentImage].src}
                alt={galleryImagesRef.current[currentImage].alt}
                fallback={<Spinner mx="auto" color="white" />}
                onClick={(event) => {
                  event.stopPropagation();

                  const nextImage =
                    currentImage < galleryImagesRef.current.length - 1
                      ? currentImage + 1
                      : 0;

                  setCurrentImage(nextImage);
                }}
              />
            </Box>
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
