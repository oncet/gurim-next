import { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import NextImage from "next/image";

import { getPosts } from "../lib/api";

export default function Blog({ posts }) {
  const [endCursor, setEndCursor] = useState(posts?.pageInfo.endCursor);
  const [hasNextPage, setHasNextPage] = useState(posts?.pageInfo.hasNextPage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState(posts?.nodes);

  const showMoreHandler = async () => {
    setIsSubmitting(true);

    const response = await getPosts(endCursor, 6);

    setIsSubmitting(false);

    setItems([...items, ...response.nodes]);
    setEndCursor(response.pageInfo.endCursor);
    setHasNextPage(response.pageInfo.hasNextPage);
  };

  return (
    <>
      <Head>
        <title>Blog — Gurim</title>
      </Head>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col gap-4">
          <h2 className="font-extralight text-4xl md:text-5xl">Blog</h2>
          {posts.nodes && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(({ slug, featuredImage, title }) => (
                  <div key={slug}>
                    <NextLink passHref href={`/${slug}`}>
                      <a className="hover:underline-offset-4 hover:underline decoration-2">
                        <div className="rounded-md overflow-hidden">
                          <NextImage
                            src={featuredImage.node.sourceUrl}
                            alt={title}
                            width={700}
                            height={700}
                            layout="responsive"
                          />
                        </div>
                        <p className="mt-2">{title}</p>
                      </a>
                    </NextLink>
                  </div>
                ))}
              </div>
              {hasNextPage && (
                <div className="flex items-center justify-center mt-2">
                  <button
                    onClick={showMoreHandler}
                    disabled={isSubmitting}
                    className={`disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-gray-100 px-4 py-2 rounded-md ${
                      isSubmitting ? "animate-pulse" : ""
                    }`}
                  >
                    Mostrar mas
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getPosts(undefined, 6);

  return {
    props: { posts },
    notFound: !posts,
    revalidate: 30,
  };
}
