import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import model01 from "@/assets/model-01.jpg";
import model06 from "@/assets/model-06.jpg";
import model07 from "@/assets/model-07.jpg";
import model08 from "@/assets/model-08.jpg";
import model09 from "@/assets/model-09.jpg";

const bestSellers = [
  { name: "Vestido Glow Dourado", price: "R$ 399,90", image: model01 },
  { name: "Conjunto Praia Luxe", price: "R$ 279,90", image: model06 },
  { name: "Body Recorte Minimal", price: "R$ 189,90", image: model07 },
  { name: "Saia Brilho Noturno", price: "R$ 259,90", image: model08 },
  { name: "Top Crochê Dourado", price: "R$ 159,90", image: model09 },
];

const BestSellers = () => {
  const [current, setCurrent] = useState(0);
  const maxSlide = bestSellers.length - 1;
  const next = () => setCurrent((c) => Math.min(c + 1, maxSlide));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  return (
    <section id="bestsellers" className="py-16 md:py-36 bg-background">
      <div className="container mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-16">
          <div>
            <p className="font-body text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-primary mb-2">
              Mais Desejadas
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground">
              Best Sellers
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={prev} className="w-9 h-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Anterior">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} className="w-9 h-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Próximo">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: `-${current * 52}%` }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex gap-3 md:gap-5"
            style={{ width: "max-content" }}
          >
            {bestSellers.map((product, i) => (
              <div key={product.name} className="w-[46vw] sm:w-[40vw] md:w-[28vw] lg:w-[22vw] flex-shrink-0 group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden mb-3 bg-muted">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm px-2.5 py-0.5">
                    <span className="font-display text-base text-primary">#{i + 1}</span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-7 h-7 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Favoritar"><Heart size={12} /></button>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                    <button className="w-full bg-primary text-primary-foreground font-body text-[9px] tracking-[0.15em] uppercase py-2.5 hover:bg-primary/90 transition-colors">Garantir meu Look</button>
                  </div>
                  <div className="absolute inset-0 border border-border/50 group-hover:border-primary/20 transition-colors" />
                </div>
                <h3 className="font-body text-[11px] md:text-sm text-foreground font-light mb-0.5">{product.name}</h3>
                <p className="font-body text-[10px] md:text-[11px] text-primary font-medium">{product.price}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-8 md:mt-12">
          {bestSellers.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-px transition-all duration-300 ${i === current ? "w-8 bg-primary" : "w-3 bg-border"}`}
              aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
