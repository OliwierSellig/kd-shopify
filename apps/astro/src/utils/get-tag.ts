import { productQuery } from '../global/queries';
import type { Product } from '../global/types';
import { shopifyClient } from './shopify';

export async function getProductsByTag(tag: string) {
  const query = `#graphql
	query getProductsByTag($tag: String!) {
	  products(first: 10, query: $tag) {
		edges {
		  node ${productQuery}
		}
	  }
	}
  `;

  const { products } = (await shopifyClient.request(query, {
    tag,
  })) as { products: { edges: { node: Product }[] } };

  return products;
}
