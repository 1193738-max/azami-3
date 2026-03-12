import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product, ProductSize, CartItem } from "@/data/products";
import { toast } from "sonner";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: ProductSize, color?: string) => void;
  removeItem: (productId: string, size: ProductSize, color?: string) => void;
  updateQuantity: (productId: string, size: ProductSize, color?: string, qty?: number) => void;
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

  const findVariant = useCallback((product: Product, size: ProductSize, color?: string) => {
    if (!product.variants) return null;
    
    let variant = product.variants.find(v => {
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

    if (!variant) {
      const normalizedSize = size?.toString().toLowerCase().trim();
      variant = product.variants.find(v => {
        const v1 = v.option1?.toLowerCase().trim();
        const v2 = v.option2?.toLowerCase().trim();
        const vt = v.title?.toLowerCase().trim();
        return v1 === normalizedSize || v2 === normalizedSize || vt?.includes(normalizedSize || "");
      });
    }

    return variant || (product.variants.length > 0 ? product.variants[0] : null);
  }, []);

  const addItem = useCallback((product: Product, size: ProductSize, color?: string) => {
    const variant = findVariant(product, size, color);
    const variantId = variant?.id;
    const stockLimit = variant?.inventory_quantity;
    const isManagementActive = variant?.inventory_management !== null;

    setItems((prev) => {
      // Differentiate items using product ID, size, and color
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.size === size && i.color === color
      );

      if (existingIdx !== -1) {
        const currentQty = prev[existingIdx].quantity;
        if (isManagementActive && stockLimit !== undefined && stockLimit !== null && currentQty >= stockLimit) {
          toast.error(`Limite atingido (${stockLimit} un. no estoque)`);
          return prev;
        }
        return prev.map((i, idx) =>
          idx === existingIdx ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      if (isManagementActive && stockLimit !== undefined && stockLimit !== null && stockLimit <= 0) {
        toast.error("Este item está esgotado!");
        return prev;
      }

      return [...prev, { product, size, color, variantId, quantity: 1 }];
    });
    setIsOpen(true);
  }, [findVariant]);

  const removeItem = useCallback((productId: string, size: ProductSize, color?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.size === size && i.color === color))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: ProductSize, color?: string, qty?: number) => {
      if (!qty || qty <= 0) {
        removeItem(productId, size, color);
        return;
      }

      setItems((prev) => {
        const item = prev.find(i => i.product.id === productId && i.size === size && i.color === color);
        if (!item) return prev;

        const variant = findVariant(item.product, item.size, item.color);
        const stockLimit = variant?.inventory_quantity;
        const isManagementActive = variant?.inventory_management !== null;

        if (isManagementActive && stockLimit !== undefined && stockLimit !== null && qty > stockLimit) {
          toast.error(`Apenas ${stockLimit} un. disponíveis`);
          return prev.map((i) =>
            i.product.id === productId && i.size === size && i.color === color
              ? { ...i, quantity: stockLimit }
              : i
          );
        }

        return prev.map((i) =>
          i.product.id === productId && i.size === size && i.color === color
            ? { ...i, quantity: qty }
            : i
        );
      });
    },
    [removeItem, findVariant]
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
