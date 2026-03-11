import { X, Heart, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

const SideWishlist = () => {
  const { items, isOpen, closeWishlist, removeItem, totalItems } = useWishlist();
  const { addItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
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
                <Heart size={16} className="text-primary" />
                <h2 className="font-display text-lg">
                  Favoritos{" "}
                  <span className="font-body text-xs text-muted-foreground">
                    ({totalItems})
                  </span>
                </h2>
              </div>
              <button onClick={closeWishlist} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Fechar Favoritos">
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <Heart size={32} className="text-muted-foreground/40" />
                  <p className="font-body text-sm text-muted-foreground">
                    Sua lista de desejos está vazia
                  </p>
                  <button
                    onClick={closeWishlist}
                    className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground border border-border px-6 py-2.5 hover:bg-muted transition-colors"
                  >
                    Explorar Coleções
                  </button>
                </div>
              ) : (
                <>
                  {items.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 pb-4 border-b border-border last:border-0"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-24 object-cover bg-muted rounded-sm"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-display text-xs tracking-wide text-foreground">
                            {product.name}
                          </h3>
                          <p className="font-display text-sm text-foreground mt-1">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                        <div className="flex items-center justify-start mt-2">
                          <button
                            onClick={() => {
                              addItem(product, product.sizes[0]);
                              removeItem(product.id);
                            }}
                            className="flex items-center gap-2 font-body text-[10px] tracking-[0.1em] uppercase text-primary hover:text-primary/70 transition-colors"
                          >
                            <ShoppingBag size={12} />
                            Mover para a Sacola
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="self-start text-muted-foreground/50 hover:text-destructive transition-colors"
                        aria-label="Remover favorito"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-border space-y-4">
                <button
                  onClick={closeWishlist}
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

export default SideWishlist;
