import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ProductCard from "./ProductCard";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const { data: products = [] } = useShopifyProducts();
  const [results, setResults] = useState(products.slice(0, 4));

  useEffect(() => {
    if (query.trim() === "") {
      setResults(products.slice(0, 4));
    } else {
      const q = query.toLowerCase();
      setResults(products.filter(p => p.name.toLowerCase().includes(q) || p.category.some(c => c.includes(q))));
    }
  }, [query, products]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setQuery("");
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md overflow-y-auto"
          >
            <div className="container mx-auto px-4 md:px-12 py-10 min-h-screen flex flex-col">
              {/* Header */}
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2"
                  aria-label="Fechar Busca"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Search Input */}
              <div className="max-w-3xl mx-auto w-full mt-10 md:mt-16">
                <div className="relative border-b border-border text-foreground flex items-center group focus-within:border-primary transition-colors">
                  <Search size={22} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="O que você está procurando?"
                    className="w-full bg-transparent border-none outline-none px-4 py-4 md:py-6 font-display text-2xl md:text-4xl lg:text-5xl placeholder:text-muted-foreground/40"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Results */}
              <div className="max-w-6xl mx-auto w-full mt-16 pb-20 flex-1">
                {results.length > 0 ? (
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-8 text-center md:text-left">
                      {query ? `${results.length} resultados para "${query}"` : "Sugestões para você"}
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                      {results.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="font-body text-sm text-muted-foreground">
                      Nenhum produto encontrado para "{query}".
                    </p>
                    <p className="font-body text-xs text-muted-foreground/60 mt-2">
                      Tente buscar por "corset", "vestido" ou "praia".
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
