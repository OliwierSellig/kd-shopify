import { cartActions, cartStore, isCartLoading } from '@/src/stores/cartStore';
import { useStore } from '@nanostores/react';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useStore(cartStore);
  const loading = useStore(isCartLoading);
  const cartRef = useRef<HTMLDivElement>(null);

  // Initialize cart on mount
  useEffect(() => {
    cartActions.initCart();
  }, []);

  const itemCount = cart?.lines.edges.reduce((sum, edge) => sum + edge.node.quantity, 0) ?? 0;

  const total = cart?.cost?.totalAmount.amount ?? '0';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
    const item = cart?.lines.edges.find((edge) => edge.node.id === lineId)?.node;
    if (!item) return;

    const maxQuantity = item.merchandise.quantityAvailable;

    if (newQuantity > maxQuantity) {
      alert(`Przepraszamy, dostępnych jest tylko ${maxQuantity} sztuk tego produktu`);
      return;
    }

    try {
      await cartActions.updateQuantity(lineId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = (lineId: string) => {
    cartActions.removeItem(lineId);
  };

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  return (
    <div className={styles.cartWrapper} ref={cartRef}>
      <button className={styles.cartToggle} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.cartIcon}>🛒</span>
        {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
      </button>

      <div className={`${styles.cartPanel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.cartHeader}>
          <h2>Koszyk</h2>
          <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>

        {!cart || cart.lines.edges.length === 0 ? (
          <div className={styles.emptyCart}>Koszyk jest pusty</div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cart.lines.edges.map(({ node: item }) => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.merchandise.image?.url} alt={item.merchandise.title} />
                  {item.merchandise?.tags?.includes('instrukcja') ? (
                    <a href={`/instrukcje/${item.merchandise.tags[0]}`}>Instrukcja</a>
                  ) : (
                    <div className={styles.itemDetails}>
                      <h3>{item.merchandise.title}</h3>
                      <p className={styles.price}>{parseFloat(item.merchandise.price.amount).toFixed(2)} PLN</p>
                      <div className={styles.quantityControls}>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.merchandise.quantityAvailable}
                          title={
                            item.quantity >= item.merchandise.quantityAvailable
                              ? `Maksymalna dostępna ilość: ${item.merchandise.quantityAvailable}`
                              : 'Dodaj więcej'
                          }
                        >
                          +
                        </button>
                      </div>
                      {item.merchandise.quantityAvailable <= 5 && (
                        <p className={styles.stockWarning}>
                          Pozostało tylko {item.merchandise.quantityAvailable} sztuk
                        </p>
                      )}
                      <button onClick={() => handleRemoveItem(item.id)} className={styles.removeButton}>
                        Usuń
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <p>
                Suma: <strong>{parseFloat(total).toFixed(2)} PLN</strong>
              </p>
              <button className={styles.checkoutButton} onClick={handleCheckout}>
                Przejdź do kasy
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
