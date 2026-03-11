import { motion } from "framer-motion";
import model04 from "@/assets/model-04.jpg";

const BrandStory = () => {
  return (
    <section id="sobre" className="py-16 md:py-36 bg-background overflow-hidden">
      <div className="container mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img src={model04} alt="AZAMI MODAS — Nossa história" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-full h-full border border-foreground/15 -z-10" />
          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="font-body text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-foreground/80 mb-4">Nossa Essência</p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-tight mb-6 md:mb-8">
              Vista a sua<br /><span className="italic text-mono-gradient">melhor versão</span>
            </h2>
            <div className="space-y-4 mb-8">
              <p className="font-body text-[11px] md:text-sm text-muted-foreground leading-relaxed">
                A AZAMI nasceu da paixão por peças que contam histórias. Cada modelo é pensado para valorizar a silhueta feminina com autenticidade e ousadia.
              </p>
              <p className="font-body text-[11px] md:text-sm text-muted-foreground leading-relaxed">
                Do crochê artesanal que evoca a brisa do litoral ao brilho que ilumina a noite, nossa curadoria une tendências globais à elegância brasileira.
              </p>
            </div>
            <div className="mb-6">
              <svg width="80" height="16" viewBox="0 0 80 16" fill="none" className="text-foreground/25">
                <path d="M0 8 C7 2, 13 14, 20 8 C27 2, 33 14, 40 8 C47 2, 53 14, 60 8 C67 2, 73 14, 80 8" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <a href="#" className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground border-b border-foreground/30 hover:border-foreground hover:text-foreground pb-1 transition-colors duration-300">
              Conheça nossa história
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
