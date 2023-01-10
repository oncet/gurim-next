import Image from "next/image";
import NextLink from "next/link";
import { getPosts } from "../lib/api";
import Slideshow from "../components/Slideshow";

export default function Home({ posts }) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col gap-8 md:gap-16 px-4">
        <div className="mx-auto w-full">
          <Slideshow />
        </div>
        <div className="border-b border-gray-200" />
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.nodes.map(({ id, title, slug, featuredImage }) => (
              <div key={id}>
                <NextLink passHref href={`/${slug}`}>
                  <a className="hover:underline-offset-4 hover:underline decoration-2">
                    <div className="rounded overflow-hidden">
                      <Image
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
        </div>
        <div className="border-b border-gray-200" />
        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <NextLink passHref href="/category/fieltro">
                <a className="hover:underline-offset-4 hover:underline decoration-2">
                  <h2 className="mb-4 text-3xl text-center font-extralight">
                    Fieltro
                  </h2>
                  <div className="rounded overflow-hidden">
                    <Image
                      src="/images/fieltro.jpg"
                      alt="Proceso de fieltrado"
                      width={600}
                      height={400}
                      layout="responsive"
                      priority
                    />
                  </div>
                </a>
              </NextLink>
            </div>
            <div>
              <NextLink passHref href="/category/ecoprint">
                <a className="hover:underline-offset-4 hover:underline decoration-2">
                  <h2 className="mb-4 text-3xl text-center font-extralight">
                    Ecoprint
                  </h2>
                  <div className="rounded overflow-hidden">
                    <Image
                      src="/images/ecoprint.jpg"
                      alt="Tela con ecoprint"
                      width={600}
                      height={400}
                      layout="responsive"
                      priority
                    />
                  </div>
                </a>
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: { posts },
    notFound: !posts,
    revalidate: 30,
  };
}
