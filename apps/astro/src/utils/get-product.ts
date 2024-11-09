import { productQuery } from '../global/queries';
import type { Product } from '../global/types';
import { shopifyClient } from './shopify';

export async function getProductBySlug(slug: string) {
  const query = `#graphql
	query getProduct($handle: String!) {
	  product(handle: $handle) ${productQuery}
	}
  `;

  const { product } = (await shopifyClient.request(query, {
    handle: slug,
  })) as { product: Product };

  return product;
}
