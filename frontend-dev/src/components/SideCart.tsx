import { useState } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { toast } from "sonner";

const SideCart = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, subtotal } = useCart();
  const [notes, setNotes] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const handleCheckout = async () => {
    const itemsWithVariants = items.filter(item => item.variantId);
    
    if (items.length === 0) {
      toast.error("Sua sacola está vazia.");
      return;
    }

    if (itemsWithVariants.length === 0) {
      toast.error("Não foi possível identificar os produtos na Shopify. Tente remover e adicionar novamente.");
      return;
    }

    setIsSyncing(true);
    try {
      console.log("🛒 Iniciando checkout Shopify...");
      
      // Clear existing Shopify cart
      await fetch('/cart/clear.js', { method: 'POST' });

      // Add items using Shopify AJAX API
      const cartAddRes = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: itemsWithVariants.map(item => ({
            id: item.variantId,
            quantity: item.quantity,
            properties: {
              'Tamanho': item.size,
              'Cor': item.color || 'Padrão',
              'Nota': notes.trim()
            }
          }))
        })
      });

      if (!cartAddRes.ok) {
        throw new Error("Falha ao comunicar com o servidor da Shopify.");
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      window.location.href = '/checkout';
    } catch (err) {
      console.error("❌ Checkout Error:", err);
      toast.error("Erro ao processar o checkout. Verifique sua conexão ou tente novamente.");
    } finally {
      setIsSyncing(false);
    }
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
                  {items.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color || idx}`}
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
                            {!item.variantId && <span className="text-[8px] text-destructive ml-1">(Identificando...)</span>}
                          </h3>
                          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                            <p className="font-body text-[10px] text-muted-foreground">
                              Tam: {item.size}
                            </p>
                            {item.color && (
                                <p className="font-body text-[10px] text-muted-foreground">
                                  Cor: {item.color}
                                </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <button
                              disabled={isSyncing}
                              onClick={() =>
                                updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                              }
                              className="w-6 h-6 border border-border flex items-center justify-center text-foreground/60 hover:border-primary transition-colors disabled:opacity-50"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-body text-xs w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              disabled={isSyncing}
                              onClick={() =>
                                updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                              }
                              className="w-6 h-6 border border-border flex items-center justify-center text-foreground/60 hover:border-primary transition-colors disabled:opacity-50"
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
                        disabled={isSyncing}
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                        className="self-start text-muted-foreground/50 hover:text-destructive transition-colors disabled:opacity-50"
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
                      disabled={isSyncing}
                      className="w-full bg-muted/50 border border-border rounded-sm px-3 py-2 font-body text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors resize-none disabled:opacity-50"
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
                <div className="space-y-2">
                    <button
                        disabled={isSyncing}
                        onClick={handleCheckout}
                        className="w-full font-body text-[10px] tracking-[0.25em] uppercase py-3.5 bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium mono-shine disabled:opacity-70 flex items-center justify-center"
                    >
                        {isSyncing ? "Processando..." : "Finalizar Compra"}
                    </button>
                    <button
                        disabled={isSyncing}
                        onClick={closeCart}
                        className="w-full font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors py-2 disabled:opacity-50"
                    >
                        Continuar Comprando
                    </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideCart;
