import { GraphQLClient } from 'graphql-request';
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_STORE_URL = import.meta.env.PUBLIC_SHOPIFY_STORE_URL;

const endpoint = `https://${SHOPIFY_STORE_URL}/api/2024-01/graphql.json`;

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
  },
});
