export const productQuery = `#graphql
{
  id
  title
  handle
  description
  tags
  metafields(identifiers: [
    {namespace: "custom", key: "your_key"}
  ]) {
    id
    namespace
    key
    value
    type
    description
    reference {
      ... on Product {
        id
        title
        handle
      }
      ... on Collection {
        id
        title
        handle
      }
      ... on Metaobject {
        id
        type
        fields {
          key
          value
        }
      }
    }
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  images(first: 10) {
    edges {
      node {
        url
        altText
        width
        height
        id
      }
    }
  }
  variants(first: 10) {
    edges {
      node {
        id
        title
        price {
          amount
          currencyCode
        }
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          url
          altText
          width
          height
        }
        sku
        quantityAvailable
      }
    }
  }
 
}
`;

const CUSTOMER_FIELDS = `#graphql
  id
  firstName
  lastName
  email
  phone
  createdAt
  defaultAddress {
    address1
    city
    country
    zip
  }
`;
