import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

// The "order" the visitor is building. It lives in React state and is mirrored
// into localStorage on every change, so a reload keeps the order.
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Read a saved order once, in the browser only.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("mirchi-cart") || "[]");
      if (Array.isArray(saved)) setItems(saved);
    } catch {
      setItems([]);
    }
    setReady(true);
  }, []);

  // Write the order back to localStorage after every change.
  useEffect(() => {
    if (ready) localStorage.setItem("mirchi-cart", JSON.stringify(items));
  }, [items, ready]);

  const addItem = (dish) => {
    setItems((current) => {
      const existing = current.find((item) => item.name === dish.name);
      if (existing) {
        return current.map((item) =>
          item.name === dish.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...current, { name: dish.name, price: dish.price, qty: 1 }];
    });
  };

  const increase = (name) =>
    setItems((current) =>
      current.map((item) => (item.name === name ? { ...item, qty: item.qty + 1 } : item))
    );

  const decrease = (name) =>
    setItems((current) =>
      current
        .map((item) => (item.name === name ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );

  const removeItem = (name) => setItems((current) => current.filter((item) => item.name !== name));
  const clearCart = () => setItems([]);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        isOpen,
        addItem,
        increase,
        decrease,
        removeItem,
        clearCart,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}