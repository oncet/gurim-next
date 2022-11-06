import { useEffect, useRef, useState, forwardRef } from "react";
import Head from "next/head";
import { Container, Heading, Stack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import { getProduct, getProductsSlugs } from "../../lib/api";
import UserContent from "../../components/UserContent";
import Tags from "../../components/Tags";
import Lightbox from "../../components/Lightbox";

export default function Product({ product }) {
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
        <title>{product.title} — Gurim</title>
        <meta
          key="og:title"
          property="og:title"
          content={`${product.title} — Gurim`}
        />
        {!!product.featuredImage?.node.sourceUrl && (
          <meta
            key="og:image"
            property="og:image"
            content={product.featuredImage.node.sourceUrl}
          />
        )}
      </Head>
      <Container maxW="container.lg">
        <Stack spacing="4">
          <Heading fontWeight="200" size="2xl">
            {product.title}
          </Heading>
          <Tags urlPrefix="/shop/" tags={product.categories.nodes} />
          <UserContent ref={userContentRef} content={product.content} />
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
              imageCount={imageLinks.length}
              selectedImage={selectedImage}
              onSelectedImageChange={(index) => {
                const { src, alt } = imageLinks[index].querySelector("img");
                setSelectedImage({ index, src, alt });
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
