const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type CustomRequestInit = RequestInit & {
  cache:
    | 'default'
    | 'force-cache'
    | 'no-cache'
    | 'no-store'
    | 'only-if-cached'
    | 'reload';
};

type Cache =
  | 'default'
  | 'force-cache'
  | 'no-cache'
  | 'no-store'
  | 'only-if-cached'
  | 'reload';

const ShopifyData = async (query: any, cache?: Cache) => {
  const URL = `https://${DOMAIN}/api/2023-10/graphql.json`;

  const options: CustomRequestInit = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN || ''
    },
    body: JSON.stringify({ query }),
    cache: cache || 'default'
  };

  try {
    const data = await fetch(URL, options);

    return await data.json();
  } catch (error) {
    console.log(error);

    throw new Error('Fetch to Shopify failed');
  }
};

export const getProducts = async () => {
  const query = `
    {
        collectionByHandle(handle: "frontpage") {
          id
          title
          products(first: 25){
            edges {
              node {
                id
                title
                handle
                priceRange{
                  maxVariantPrice{
                    amount
                  }
                  minVariantPrice{
                    amount
                  }
                }
                images(first: 10){
                  edges {
                    node {
                      originalSrc
                      altText
                    }
                  }
                }
              }
            }
          }
        }
    }`;

  const response: any = await ShopifyData(query);

  const allProducts = response.data.collectionByHandle.products.edges || [];

  return allProducts;
};

export const getAllProducts = async () => {
  const query = `{
    products(first: 25){
      edges {
          node {
            handle
            id
          }
        }
      }
    }`;

  const response: any = await ShopifyData(query);

  return response.data.products.edges || [];
};

export const getProduct = async (id: string) => {
  const query = `{
  product(handle: "${id}") {
    id
    title
    handle
    description
    images(first: 5){
      edges{
        node {
          url
          altText
        }
      }
    }
    options{
      id
      name
      values
    }
    variants(first: 25){
      edges{
        node{
          selectedOptions{
            name
            value
          }
          image {
            url
            altText
          }
          title
          id
          price {
            amount
          }
        }
      }
    }
  }
}`;

  const response: any = await ShopifyData(query, 'no-store');

  return response.data?.product || {};
};

export const createCheckout = async (id: string, quantity: number) => {
  const query = `
    mutation {
      checkoutCreate(
        input: {
          lineItems: [
            { variantId: "${id}", quantity: ${quantity}}
          ]
        }
      ) {
        checkout {
          id
          webUrl
        }
      }
    }
  `;

  const response: any = await ShopifyData(query);

  return response.data?.checkoutCreate?.checkout || {};
};

export const updateCheckout = async (id: string, lineItems: any) => {
  const lineItemsObject = lineItems.map((item: any) => {
    return `{variantId: "${item.id}", quantity: ${item.quantity}}`;
  });

  const query = `
      mutation {
        checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
          checkout {
            id
            webUrl
            lineItems(first: 25) {
              edges {
                node {
                  id
                  title
                  quantity
                }
              }
            }
          }
        }
      }
  `;

  const response: any = await ShopifyData(query);

  return response.data?.checkoutLineItemsReplace?.checkout || {};
};
