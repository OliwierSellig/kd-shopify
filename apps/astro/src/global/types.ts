export type Product = {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string;
        width: number;
        height: number;
        id: string;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        selectedOptions: {
          name: string;
          value: string;
        }[];
        image: {
          url: string;
          altText: string;
          width: number;
          height: number;
        };
        sku: string;
        quantityAvailable: number;
      };
    }[];
  };
};

export type Collection = {
  title: string;
  products: { edges: { node: Product }[] };
};

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface CartCost {
  totalAmount: Money;
}
export interface CartImage {
  url: string;
  altText?: string;
}

export interface CartMerchandise {
  id: string;
  title: string;
  price: {
    amount: string;
  };
  image?: CartImage;
  tags: string[];
  quantityAvailable: number;
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: CartMerchandise;
}

export interface CartLineEdge {
  node: CartLine;
}

export interface CartLinesConnection {
  edges: CartLineEdge[];
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: CartLinesConnection;
  cost?: CartCost;
}

export interface CreateCartResponse {
  cartCreate: {
    cart: Cart;
  };
}

export interface AddToCartResponse {
  cartLinesAdd: {
    cart: Cart;
  };
}

export interface UpdateCartLinesResponse {
  cartLinesUpdate: {
    cart: Cart;
  };
}
