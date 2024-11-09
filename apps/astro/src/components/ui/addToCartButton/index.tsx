import { cartActions, isCartLoading } from '@/src/stores/cartStore';
import { useStore } from '@nanostores/react';
import styles from './styles.module.scss';

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const loading = useStore(isCartLoading);

  const handleAddToCart = () => {
    cartActions.addToCart(product.id);
  };

  return (
    <button onClick={handleAddToCart} className={styles.button}>
      {loading ? 'Dodawanie...' : 'Dodaj do koszyka'}
    </button>
  );
}
