// @ts-nocheck

import { ADD_TO_CART_MUTATION, CREATE_CART_MUTATION, GET_CART_QUERY, UPDATE_CART_LINES_MUTATION } from '../global/mutations';
import type { Cart } from '../global/types';
import { shopifyClient } from './shopify';

const CART_ID_KEY = 'shopifyCartId';

interface CartLine {
  merchandiseId: string;
  quantity: number;
}

export class CartService {
  static getCartId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(CART_ID_KEY);
  }

  static setCartId(cartId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_ID_KEY, cartId);
  }

  static clearCartId(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CART_ID_KEY);
  }

  static async createCart(lines: CartLine[], countryCode?: string) {
    const variables = {
      lines,
      buyerIdentity: countryCode ? { countryCode } : undefined,
    };

    const response = await shopifyClient.request(CREATE_CART_MUTATION, variables);
    const cartId = response.cartCreate.cart.id;
    this.setCartId(cartId);

    return response.cartCreate.cart;
  }

  static async fetchCart(cartId: string) {
    try {
      const response = await shopifyClient.request<{ cart: Cart }>(GET_CART_QUERY, { cartId });

      // If cart exists and is valid, return it
      if (response.cart) {
        return response.cart;
      }

      // If we get here, cart exists but might be empty or invalid
      this.clearCartId();
      return null;
    } catch (error) {
      // If there's an error (cart not found or expired)
      console.error('Error fetching cart:', error);
      this.clearCartId();
      return null;
    }
  }

  static async addToCart(variantId: string, quantity: number = 1) {
    const cartId = this.getCartId();

    if (!cartId) {
      // Create new cart if none exists
      return this.createCart([{ merchandiseId: variantId, quantity }]);
    }

    // Add to existing cart
    const variables = {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    };

    const response = await shopifyClient.request(ADD_TO_CART_MUTATION, variables);
    return response.cartLinesAdd.cart;
  }

  static async updateLineQuantity(cartId: string, lineId: string, quantity: number) {
    const variables = {
      cartId,
      lines: [
        {
          id: lineId,
          quantity,
        },
      ],
    };

    const response = await shopifyClient.request(UPDATE_CART_LINES_MUTATION, variables);
    return response.cartLinesUpdate.cart;
  }
}
