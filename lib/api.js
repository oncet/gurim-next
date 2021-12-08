const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getProductsForHome() {
  const data = await fetchAPI(`
    query MyQuery {
      products(first: 10) {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
    }
  `);

  return data?.products;
}

export async function getProductsSlugs() {
  const data = await fetchAPI(`
    query MyQuery {
      products(first: 500) {
        edges {
          node {
            slug
          }
        }
      }
    }  
  `);

  return data?.products;
}

export async function getProduct(slug) {
  const data = await fetchAPI(`
    query MyQuery {
      product(id: "${slug}", idType: SLUG) {
        title
        content
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  `);

  return data?.product;
}

export async function getPageUris() {
  const data = await fetchAPI(`
    query MyQuery {
      pages {
        edges {
          node {
            uri
          }
        }
      }
    }
`);

  return data?.pages;
}

export async function getPageByUri(uri) {
  const data = await fetchAPI(`
    query MyQuery {
      pageBy(uri: "${uri}") {
        title
        content
      }
    }
  `);

  return data?.pageBy;
}

export async function getPostUris() {
  const data = await fetchAPI(`
    query MyQuery {
      posts {
        edges {
          node {
            uri
          }
        }
      }
    }
`);

  return data?.posts;
}

export async function getPostByUri(uri) {
  const data = await fetchAPI(`
    query MyQuery {
      postBy(uri: "${uri}") {
        title
        content
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  `);

  return data?.postBy;
}

export async function getCategoriesSlugs() {
  const data = await fetchAPI(`
    query MyQuery {
      categories(first: 500) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  return data?.categories;
}

export async function getCategory(slug, after, preview) {
  const data = await fetchAPI(`
    query MyQuery {
      category(id: "${slug}", idType: SLUG) {
        name
        slug
        products(first: 6, , after: "${after}") {
          edges {
            node {
              title
              slug
              featuredImage {
                node {
                  title
                  altText
                  sourceUrl(size: THUMBNAIL)
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
        posts {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    }
  `);

  return data?.category;
}
