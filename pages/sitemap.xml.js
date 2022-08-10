const Sitemap = () => null;

export const getServerSideProps = async ({ res }) => {
  if (res) {
    res.setHeader("Content-Type", "text/xml");
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://gurim.com.ar</loc>
      </url>
      <url>
        <loc>https://gurim.com.ar/nosotros</loc>
      </url>
      <url>
        <loc>https://gurim.com.ar/contacto</loc>
      </url>
      <url>
        <loc>https://gurim.com.ar/blog</loc>
        <changefreq>monthly</changefreq>
      </url>
    </urlset>`);
    res.end();
  }
  return {
    props: {},
  };
};

export default Sitemap;
