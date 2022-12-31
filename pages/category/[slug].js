import { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import NextImage from "next/image";

import { getCategory, getCategoriesSlugs } from "../../lib/api";

export default function Category({ category }) {
  const [endCursor, setEndCursor] = useState(
    category?.posts.pageInfo.endCursor
  );
  const [hasNextPage, setHasNextPage] = useState(
    category?.posts.pageInfo.hasNextPage
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState(category?.posts.edges);

  const showMoreHandler = async () => {
    setIsSubmitting(true);

    const response = await getCategory(category.slug, endCursor);

    setIsSubmitting(false);

    setItems([...items, ...response.posts.edges]);
    setEndCursor(response.posts.pageInfo.endCursor);
    setHasNextPage(response.posts.pageInfo.hasNextPage);
  };

  return (
    <>
      <Head>
        <title>{category.name} — Gurim</title>
        <meta
          key="og:title"
          property="og:title"
          content={`${category.name} — Gurim`}
        />
      </Head>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col gap-4">
          <h2 className="font-extralight text-4xl md:text-5xl">
            {category.name}
          </h2>
          {category.posts.edges && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(({ node }) => (
                  <div key={node.slug}>
                    <NextLink passHref href={`/${node.slug}`}>
                      <a className="hover:underline-offset-4 hover:underline decoration-2">
                        <div className="rounded-md overflow-hidden">
                          <NextImage
                            src={node.featuredImage.node.sourceUrl}
                            alt={node.title}
                            width={700}
                            height={700}
                            layout="responsive"
                          />
                        </div>
                        <p className="mt-2">{node.title}</p>
                      </a>
                    </NextLink>
                  </div>
                ))}
              </div>
              {hasNextPage && (
                <div className="flex items-center justify-center mt-2">
                  {/* <Button
                    isLoading={isSubmitting}
                    variant="ghost"
                  > */}
                  <button onClick={showMoreHandler} disabled={isSubmitting}>
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

export async function getStaticPaths() {
  const categories = await getCategoriesSlugs();

  const paths = categories.edges.map(({ node }) => ({
    params: { slug: node.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const category = await getCategory(params.slug);

  return {
    props: { category },
    notFound: !category,
    revalidate: 30,
  };
}
