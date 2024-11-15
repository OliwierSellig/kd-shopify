import { productQuery } from '../global/queries';
import type { Product } from '../global/types';
import { shopifyClient } from './shopify';

export async function getProductsByType(productType: string) {
  const query = `#graphql
    query getProductsByType($productType: String!) {
      products(first: 10, query: $productType) {
        edges {
          node ${productQuery}
        }
      }
    }
  `;

  const variables = {
    productType: `product_type:'${productType}'`,
  };

  const { products } = (await shopifyClient.request(query, variables)) as {
    products: { edges: { node: Product }[] };
  };

  return products;
}
