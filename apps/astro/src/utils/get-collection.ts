import { productQuery } from '../global/queries';
import type { Collection } from '../global/types';
import { shopifyClient } from './shopify';

export async function getCollectionById(id: string) {
  const query = `#graphql
  query getCollectionById($id: ID!) {
    collection(id: $id) {
      title
      products(first: 10) {
        edges {
          node ${productQuery}
        }
      }
    }
  }
`;

  const { collection } = (await shopifyClient.request(query, {
    id,
  })) as { collection: Collection };

  return collection;
}
