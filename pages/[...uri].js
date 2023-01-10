import { useEffect, useRef, useState } from "react";
import Head from "next/head";

import {
  getPageUris,
  getPostUris,
  getPageByUri,
  getPostByUri,
} from "../lib/api";

import UserContent from "../components/UserContent";
import Tags from "../components/Tags";
import Lightbox from "../components/Lightbox";

export default function Page({ page }) {
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
        <meta
          key="og:title"
          property="og:title"
          content={`${page.title} — Gurim`}
        />
        {!!page.featuredImage?.node.sourceUrl && (
          <meta
            key="og:image"
            property="og:image"
            content={page.featuredImage.node.sourceUrl}
          />
        )}
      </Head>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col gap-4">
          <h2 className="font-extralight text-4xl md:text-5xl">{page.title}</h2>
          {page.categories && <Tags tags={page.categories.nodes} />}
          <UserContent ref={userContentRef} content={page.content} />
        </div>
      </div>
      {isOpen && (
        <div
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
        </div>
      )}
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

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const uri = `/${params.uri.join("/")}/`;

  const page = await getPageByUri(uri);
  const post = await getPostByUri(uri);

  const content = page || post;

  return {
    props: { page: page || post },
    notFound: !content,
    revalidate: 30,
  };
}
