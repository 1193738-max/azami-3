import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product, ProductSize, CartItem } from "@/data/products";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: ProductSize, color?: string) => void;
  removeItem: (productId: string, size: ProductSize) => void;
  updateQuantity: (productId: string, size: ProductSize, qty: number) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, size: ProductSize, color?: string) => {
    // Advanced variant matching using optionMapping
    let variant = product.variants?.find(v => {
      let isMatch = true;
      
      if (size && product.optionMapping?.size) {
        const vSize = (v as any)[product.optionMapping.size]?.toLowerCase().trim();
        if (vSize !== size.toString().toLowerCase().trim()) isMatch = false;
      }
      
      if (color && product.optionMapping?.color) {
        const vColor = (v as any)[product.optionMapping.color]?.toLowerCase().trim();
        if (vColor !== color.toLowerCase().trim()) isMatch = false;
      }
      
      return isMatch;
    });
    
    // Fallback to title/loose match if direct mapping fails
    if (!variant) {
      const normalizedSize = size?.toString().toLowerCase().trim();
      variant = product.variants?.find(v => {
        const v1 = v.option1?.toLowerCase().trim();
        const v2 = v.option2?.toLowerCase().trim();
        const vt = v.title?.toLowerCase().trim();
        return v1 === normalizedSize || v2 === normalizedSize || vt?.includes(normalizedSize || "");
      });
    }

    // Ultimate fallback to first variant
    if (!variant && product.variants && product.variants.length > 0) {
      variant = product.variants[0];
    }
    
    const variantId = variant?.id;

    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, size, variantId, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, size: ProductSize) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.size === size))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: ProductSize, qty: number) => {
      if (qty <= 0) {
        removeItem(productId, size);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.size === size
            ? { ...i, quantity: qty }
            : i
        )
      );
    },
    [removeItem]
  );

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
