import { atom } from 'nanostores';
import type { Cart } from '../global/types';
import { CartService } from '../utils/cart-services';

export const cartStore = atom<Cart | null>(null);
export const isCartLoading = atom<boolean>(true);

export const cartActions = {
  async initCart() {
    const cartId = CartService.getCartId();
    if (cartId) {
      try {
        const cart = await CartService.fetchCart(cartId);
        cartStore.set(cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
        cartStore.set(null);
      }
    } else {
      cartStore.set(null);
    }
    isCartLoading.set(false);
  },

  async addToCart(variantId: string, quantity: number = 1) {
    isCartLoading.set(true);
    try {
      const updatedCart = await CartService.addToCart(variantId, quantity);
      cartStore.set(updatedCart);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      isCartLoading.set(false);
    }
  },

  async updateQuantity(lineId: string, quantity: number) {
    const currentCart = cartStore.get();
    if (!currentCart) return;

    try {
      const updatedCart = await CartService.updateLineQuantity(currentCart.id, lineId, quantity);
      cartStore.set(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  },

  async removeItem(lineId: string) {
    const currentCart = cartStore.get();
    if (!currentCart) return;

    try {
      const updatedCart = await CartService.updateLineQuantity(currentCart.id, lineId, 0);
      cartStore.set(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  },
};
