import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/data/products";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const BestSellers = () => {
  const { data: allProducts = [], isLoading } = useShopifyProducts();
  const { toggleItem, isWishlisted } = useWishlist();
  
  const bestSellers = useMemo(() => {
    return allProducts.filter(p => 
      p.isBestSeller || 
      p.category.includes("bestseller") || 
      p.category.includes("best-sellers") ||
      p.category.includes("mais-vendidos")
    ).slice(0, 8);
  }, [allProducts]);

  const [current, setCurrent] = useState(0);
  const maxSlide = Math.max(0, bestSellers.length - 1);
  const next = () => setCurrent((c) => Math.min(c + 1, maxSlide));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  if (isLoading && bestSellers.length === 0) return null;
  if (!isLoading && bestSellers.length === 0) return null; // Não mostra seção vazia

  return (
    <section id="bestsellers" className="py-12 md:py-36 bg-background">
      <div className="container mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <p className="font-body text-[9px] tracking-[0.4em] uppercase text-primary mb-2">
              Mais Desejadas
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground">
              Best Sellers
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <button onClick={prev} className="w-9 h-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Anterior">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} className="w-9 h-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Próximo">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div 
            className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
          >
            {bestSellers.map((product, i) => (
              <div 
                key={product.id} 
                className="w-[75vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] flex-shrink-0 snap-start group/item"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-3 bg-muted group/image">
                  <Link to={`/produto/${product.id}`} className="block h-full">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105" 
                      loading="lazy"
                    />
                  </Link>
                  <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2.5 py-0.5">
                    <span className="font-display text-sm text-primary">#{i + 1}</span>
                  </div>
                  <div className="absolute top-3 right-3 md:opacity-0 md:group-hover/item:opacity-100 transition-opacity duration-300 z-20">
                    <button 
                      onClick={() => {
                        const isFav = isWishlisted(product.id);
                        toggleItem(product);
                        toast(isFav ? `${product.name} removido` : `${product.name} nos favoritos 💛`);
                      }}
                      className={`w-8 h-8 backdrop-blur-sm flex items-center justify-center transition-all ${isWishlisted(product.id) ? 'bg-primary text-primary-foreground border-primary' : 'bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground'}`} 
                      aria-label="Favoritar"
                    >
                      <Heart size={13} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  
                  {/* Action Bar - Desktop Always Hide/Hover, Mobile visible or subtle */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover/item:translate-y-0 transition-transform duration-400 z-10 hidden md:block">
                    <Link to={`/produto/${product.id}`} className="w-full block text-center bg-primary text-primary-foreground font-body text-[10px] tracking-[0.1em] uppercase py-3 hover:bg-primary/95">
                      Garantir meu Look
                    </Link>
                  </div>
                </div>
                
                <Link to={`/produto/${product.id}`}>
                  <h3 className="font-body text-xs md:text-sm text-foreground font-light mb-0.5 truncate">{product.name}</h3>
                  <p className="font-body text-[11px] md:text-xs text-primary font-medium">{formatPrice(product.price)}</p>
                </Link>
              </div>
            ))}
          </div>

          {/* Progress Indicator - Mobile mostly */}
          <div className="md:hidden flex items-center justify-center gap-1.5 mt-2">
            {bestSellers.map((_, i) => (
              <div 
                key={i} 
                className={`h-[2px] rounded-full transition-all duration-300 ${i === current ? "w-6 bg-primary" : "w-2 bg-border"}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
