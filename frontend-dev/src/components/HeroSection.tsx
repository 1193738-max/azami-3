import { motion } from "framer-motion";
import model01 from "@/assets/model-01.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Hero image fills below header */}
      <div className="relative flex-1">
        <div className="absolute inset-0">
          <img
            src={model01}
            alt="AZAMI MODAS — A expressão máxima da sua autoconfiança"
            className="w-full h-full object-cover object-center animate-slow-zoom"
          />
          {/* Gradient overlay: transparent top → soft black bottom for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Content — bottom aligned */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-5 md:px-12 pb-12 md:pb-24">
            <div className="max-w-2xl mx-auto md:mx-0">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-body text-[9px] md:text-[11px] tracking-[0.4em] uppercase text-white/60 mb-4"
              >
                Nova Coleção 2026
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="font-display text-[2rem] leading-[1.05] sm:text-4xl md:text-5xl lg:text-7xl font-light text-white mb-5 md:mb-6"
              >
                A Expressão Máxima
                <br />
                da sua{" "}
                <span className="italic text-white">Autoconfiança</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="font-body text-[11px] md:text-sm text-white/70 max-w-sm md:max-w-md mb-7 md:mb-10 leading-relaxed"
              >
                Peças autorais que celebram a sua silhueta. Crochê artesanal, recortes
                estratégicos e brilho na medida certa.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6"
              >
                <a
                  href="/produtos"
                  className="font-body text-[10px] tracking-[0.3em] uppercase bg-white text-black px-9 py-4 text-center hover:bg-white/90 transition-all duration-400 mono-shine"
                >
                  Conferir Colecção
                </a>
                <a
                  href="#bestsellers"
                  className="font-display text-sm md:text-base italic text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-0.5 transition-all duration-400"
                >
                  Mais Vendidos
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent origin-center"
      />
    </section>
  );
};

export default HeroSection;
