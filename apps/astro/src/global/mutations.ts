const CART_FIELDS = `#graphql
  id
  checkoutUrl
  lines(first: 250) {
    edges {
      node {
        id
        quantity
       merchandise {
          ... on ProductVariant {
            id
            title
            price {
              amount
            }
            image {
              url
              altText
            }
			quantityAvailable

          }
        }
      }
    }
  }
  cost {
    totalAmount {
      amount
      currencyCode
    }
  }
`;

export const CREATE_CART_MUTATION = `#graphql
  mutation createCart($lines: [CartLineInput!], $buyerIdentity: CartBuyerIdentityInput) {
    cartCreate(input: { lines: $lines, buyerIdentity: $buyerIdentity }) {
      cart {
        ${CART_FIELDS}
      }
    }
  }
`;

export const ADD_TO_CART_MUTATION = `#graphql
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FIELDS}
      }
    }
  }
`;

export const UPDATE_CART_LINES_MUTATION = `#graphql
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FIELDS}
      }
    }
  }
`;

export const GET_CART_QUERY = `#graphql
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
		${CART_FIELDS}
    }
  }
`;
