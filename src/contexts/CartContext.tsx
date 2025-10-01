import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'amazon-cart';

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'qty'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, qty: Math.min(item.qty + 1, 99) }
            : item
        );
      }

      return [...prevItems, { ...newItem, qty: 1 }];
    });
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: Math.min(quantity, 99) } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (id: number): number => {
    const item = items.find((item) => item.id === id);
    return item ? item.qty : 0;
  };

  const itemCount = items.reduce((total, item) => total + item.qty, 0);

  const value: CartContextType = {
    items,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
