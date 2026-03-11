import { useState } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

const WHATSAPP_NUMBER = "5511918439062";

const SideCart = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, subtotal } = useCart();
  const [notes, setNotes] = useState("");

  const handleCheckout = () => {
    const productLines = items
      .map(
        (item) =>
          `${item.quantity}x ${item.product.name} - Tam ${item.size} - ${formatPrice(item.product.price)}`
      )
      .join("\n");

    let message = `✨ Olá! Gostaria de finalizar o meu pedido na *AZAMI MODAS* 🛍️\n\n📦 *PRODUTOS SELECIONADOS:*\n\n${productLines}\n\n💰 *SUBTOTAL:* ${formatPrice(subtotal)}`;

    if (notes.trim()) {
      message += `\n\n📝 *OBSERVAÇÕES:* ${notes.trim()}`;
    }

    message += `\n\n📩 Aguardo o retorno para combinar o envio! 💛`;

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
    closeCart();
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={16} className="text-primary" />
                <h2 className="font-display text-lg">
                  Sacola{" "}
                  <span className="font-body text-xs text-muted-foreground">
                    ({totalItems})
                  </span>
                </h2>
              </div>
              <button onClick={closeCart} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag size={32} className="text-muted-foreground/40" />
                  <p className="font-body text-sm text-muted-foreground">
                    Sua sacola está vazia
                  </p>
                  <button
                    onClick={closeCart}
                    className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground border border-border px-6 py-2.5 hover:bg-muted transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <>
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-4 pb-4 border-b border-border last:border-0"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover bg-muted rounded-sm"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-display text-xs tracking-wide text-foreground">
                            {item.product.name}
                          </h3>
                          <p className="font-body text-[10px] text-muted-foreground mt-0.5">
                            Tam: {item.size}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.size, item.quantity - 1)
                              }
                              className="w-6 h-6 border border-border flex items-center justify-center text-foreground/60 hover:border-primary transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-body text-xs w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.size, item.quantity + 1)
                              }
                              className="w-6 h-6 border border-border flex items-center justify-center text-foreground/60 hover:border-primary transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="font-display text-sm text-foreground">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="self-start text-muted-foreground/50 hover:text-destructive transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                  {/* Observações */}
                  <div className="pt-2">
                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">
                      Observações (opcional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex: Entregar após as 18h..."
                      rows={2}
                      className="w-full bg-muted/50 border border-border rounded-sm px-3 py-2 font-body text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="font-display text-lg text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full font-body text-[10px] tracking-[0.25em] uppercase py-3.5 bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium mono-shine"
                >
                  Finalizar Compra
                </button>
                <button
                  onClick={closeCart}
                  className="w-full font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Continuar Comprando
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideCart;
