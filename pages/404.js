import NextLink from "next/link";
import Head from "next/head";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Página no encontrada — Gurim</title>
      </Head>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col gap-4">
          <h2 className="font-extralight text-4xl md:text-5xl text-center">
            Página no encontrada :(
          </h2>
          <p className="text-center">
            Si cree que se trata de un error, por favor póngase en{" "}
            <NextLink passHref href="/contacto">
              <a>contacto</a>
            </NextLink>
            .
          </p>
        </div>
      </div>
    </>
  );
}
