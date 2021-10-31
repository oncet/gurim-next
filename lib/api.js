const API_URL = process.env.WORDPRESS_API_URL;

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
            content
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
        id
        title
        slug
        content
        date
      }
    }
  `);
  return data?.product;
}
