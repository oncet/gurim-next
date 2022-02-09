import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Box, Heading, Stack, Container, Modal, ModalOverlay, ModalContent, Image, Spinner, ModalBody, chakra } from "@chakra-ui/react";

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
  const [current, setCurrent] = useState({
    src: "",
    width: 0,
    height: 0
  })
  const userContentRef = useRef();
  const emptyRef = useRef();

  const onClose = () => setIsOpen(false)

  useEffect(() => {
    const imageLinks = userContentRef.current.querySelectorAll('.blocks-gallery-item a');

    imageLinks.forEach((imageLink) => {
      imageLink.addEventListener('click', (event) => {
        event.preventDefault();

        setCurrent({
          src: event.currentTarget.href,
          alt: event.target.alt,
        });
        setIsOpen(true);
      });
    })
  }, [userContentRef.current])

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
      <Modal
        finalFocusRef={emptyRef}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="fluid-width"
        variant="transparent"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody position="relative" p={0}>
            <Image
              src={current.src}
              alt={current.alt}
              fallback={<Spinner mx="auto" color="white" />}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
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
