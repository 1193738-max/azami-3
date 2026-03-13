import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/data/products";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const NightCollection = () => {
  const { data: allProducts = [], isLoading } = useShopifyProducts();
  const { toggleItem, isWishlisted } = useWishlist();
  
  const nightProducts = useMemo(() => {
    return allProducts.filter(p => 
        p.category.includes("night") || 
        p.category.includes("noite") || 
        p.category.includes("night-out")
    ).slice(0, 4);
  }, [allProducts]);

  if (isLoading && nightProducts.length === 0) return null;
  if (!isLoading && nightProducts.length === 0) return null;

  return (
    <section id="night" className="relative bg-black text-white py-16 md:py-36 overflow-hidden">
      <div className="container mx-auto px-5 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-body text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/80 mb-3"
          >
            Coleção Noite
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl md:text-6xl font-light leading-tight"
          >
            Night <span className="italic text-white font-serif tracking-wide border-b border-white/20 pb-1">Glow</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-[11px] md:text-xs text-white/60 mt-4 max-w-sm mx-auto leading-relaxed"
          >
            Corsets estruturados, recortes estratégicos e texturas que capturam cada olhar.
          </motion.p>
        </div>

        {/* Mobile: Horizontal Scroll | Desktop: Asymmetric Grid */}
        <div className="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory">
          {/* Featured item */}
          {nightProducts[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="min-w-[85vw] md:min-w-0 md:col-span-1 md:row-span-2 group relative cursor-pointer overflow-hidden snap-center"
            >
              <div className="aspect-[3/4] md:aspect-auto md:h-[100%]">
                <Link to={`/produto/${nightProducts[0].id}`} className="block h-full w-full">
                  <img src={nightProducts[0].image} alt={nightProducts[0].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </Link>
              </div>
              <div className="absolute inset-x-0 inset-y-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 right-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-30">
                <button 
                  onClick={() => {
                    const isFav = isWishlisted(nightProducts[0].id);
                    toggleItem(nightProducts[0]);
                    toast(isFav ? `${nightProducts[0].name} removido` : `${nightProducts[0].name} nos favoritos 💛`);
                  }}
                  className={`w-9 h-9 backdrop-blur-md flex items-center justify-center border border-white/10 transition-colors ${isWishlisted(nightProducts[0].id) ? 'bg-primary border-primary text-primary-foreground' : 'bg-black/40 text-white'}`} 
                  aria-label="Favoritar"
                >
                  <Heart size={14} fill={isWishlisted(nightProducts[0].id) ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 z-20">
                <Link to={`/produto/${nightProducts[0].id}`}>
                  <h3 className="font-body text-sm md:text-lg text-white font-light mb-1">{nightProducts[0].name}</h3>
                  <p className="font-body text-xs md:text-sm text-white/80 font-medium mb-4">{formatPrice(nightProducts[0].price)}</p>
                </Link>
                <Link to={`/produto/${nightProducts[0].id}`} className="inline-block bg-white text-black font-body text-[10px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-white/90 transition-colors">
                  Garantir meu Look
                </Link>
              </div>
            </motion.div>
          )}

          {/* Other items in the same flow */}
          <div className="flex md:contents gap-4">
            {nightProducts.slice(1).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="min-w-[70vw] md:min-w-0 group relative cursor-pointer overflow-hidden snap-center"
              >
                <div className="aspect-[3/4]">
                  <Link to={`/produto/${product.id}`} className="block h-full w-full">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </Link>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 right-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20">
                  <button 
                    onClick={() => {
                      const isFav = isWishlisted(product.id);
                      toggleItem(product);
                      toast(isFav ? `${product.name} removido` : `${product.name} nos favoritos 💛`);
                    }}
                    className={`w-8 h-8 backdrop-blur-md flex items-center justify-center border border-white/10 transition-colors ${isWishlisted(product.id) ? 'bg-primary border-primary text-primary-foreground' : 'bg-black/40 text-white'}`} 
                    aria-label="Favoritar"
                  >
                    <Heart size={12} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
                  </button>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-10">
                  <Link to={`/produto/${product.id}`}>
                    <h3 className="font-body text-xs md:text-sm text-white font-light mb-0.5">{product.name}</h3>
                    <p className="font-body text-[10px] text-white/90 font-medium">{formatPrice(product.price)}</p>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="text-center mt-10 md:mt-14">
          <Link to="/produtos?cat=night" className="font-body text-[10px] tracking-[0.2em] uppercase text-white border-b border-white/30 hover:border-white pb-1 transition-colors duration-300">
            Ver toda a coleção Noite
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NightCollection;
