import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { formatPrice } from "@/data/products";
import { Link } from "react-router-dom";

const NightCollection = () => {
  const { data: allProducts = [], isLoading } = useShopifyProducts();
  
  const nightProducts = useMemo(() => {
    return allProducts.filter(p => p.category.includes("night") || p.category.includes("noite")).slice(0, 4);
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

        {/* Grid — 2 cols on mobile, asymmetric on desktop */}
        <div className="grid grid-cols-2 gap-2.5 md:gap-4">
          {/* Large featured item */}
          {nightProducts[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="col-span-2 md:col-span-1 md:row-span-2 group relative cursor-pointer overflow-hidden"
            >
              <div className="aspect-[3/4] md:aspect-auto md:h-full">
                <Link to={`/produto/${nightProducts[0].id}`} className="block h-full w-full">
                  <img src={nightProducts[0].image} alt={nightProducts[0].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </Link>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_4%)/70] via-transparent to-transparent" />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-8 h-8 bg-[hsl(0_0%_4%)/60] backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Favoritar"><Heart size={13} /></button>
              </div>
              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-20">
                <Link to={`/produto/${nightProducts[0].id}`} className="w-full block text-center bg-white text-black font-body text-[9px] md:text-[10px] tracking-[0.2em] uppercase py-3 hover:bg-white/90 transition-colors mono-shine">Garantir meu Look</Link>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-10">
                <Link to={`/produto/${nightProducts[0].id}`}>
                  <h3 className="font-body text-xs md:text-sm text-white font-light mb-0.5">{nightProducts[0].name}</h3>
                  <p className="font-body text-[10px] md:text-[11px] text-white/90 font-medium">{formatPrice(nightProducts[0].price)}</p>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Smaller items */}
          {nightProducts.slice(1).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
              className="group relative cursor-pointer overflow-hidden"
            >
              <div className="aspect-[3/4]">
                <Link to={`/produto/${product.id}`} className="block h-full w-full">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </Link>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_4%)/70] via-transparent to-transparent" />
              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-7 h-7 bg-[hsl(0_0%_4%)/60] backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Favoritar"><Heart size={12} /></button>
              </div>
              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-20">
                <Link to={`/produto/${product.id}`} className="w-full block text-center bg-white text-black font-body text-[9px] tracking-[0.15em] uppercase py-2.5 hover:bg-white/90 transition-colors mono-shine">Garantir meu Look</Link>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-5 z-10">
                <Link to={`/produto/${product.id}`}>
                  <h3 className="font-body text-[11px] md:text-sm text-white font-light mb-0.5">{product.name}</h3>
                  <p className="font-body text-[10px] text-white/90 font-medium">{formatPrice(product.price)}</p>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="text-center mt-10 md:mt-14">
          <a href="#" className="font-body text-[10px] tracking-[0.2em] uppercase text-white border-b border-white/30 hover:border-white pb-1 transition-colors duration-300">
            Ver toda a coleção Noite
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default NightCollection;
