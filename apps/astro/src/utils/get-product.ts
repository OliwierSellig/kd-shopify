import { productQuery } from '../global/queries';
import type { Product } from '../global/types';
import { shopifyClient } from './shopify';

export async function getProductBySlug(slug: string) {
  const query = `#graphql
	query getProduct($handle: String!) {
	  product(handle: $handle) ${productQuery}
	}
  `;

  const requestHeaders = {
    'Cache-Control': 'no-store',
  };

  const { product } = (await shopifyClient.request(query, {
    handle: slug,
    requestHeaders,
  })) as { product: Product };

  return product;
}
