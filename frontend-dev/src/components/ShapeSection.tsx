import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import model01 from "@/assets/model-01.jpg";

const ShapeSection = () => {
  return (
    <section className="relative bg-[hsl(0_0%_3%)] text-white overflow-hidden">
      <div className="flex flex-col md:grid md:grid-cols-2 min-h-[auto] md:min-h-[80vh]">
        {/* Image */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] md:aspect-auto overflow-hidden">
          <img 
            src={(() => {
              const url = (window as any)?.ShopifyThemeSettings?.shapeImgUrl;
              return url && typeof url === 'string' && !url.includes('no-image') ? url : model01;
            })()} 
            alt="O Shape que esculpe" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[hsl(0_0%_3%)] md:bg-gradient-to-r md:from-transparent md:to-[hsl(0_0%_3%)]" />
        </motion.div>

        {/* Text */}
        <div className="flex items-center px-5 md:px-16 lg:px-24 py-10 md:py-0 -mt-8 md:mt-0 relative z-10">
          <div className="max-w-md">
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="font-body text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/80 mb-4">
              O Diferencial
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-6">
              O Shape<br />que <span className="italic text-mono-gradient">Esculpe</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-[11px] md:text-sm text-white/60 leading-relaxed mb-5">
              Cada peça é projetada para acompanhar e valorizar as curvas do corpo feminino.
              Modelagem ergonômica e recortes que criam linhas de silhueta impecáveis.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
              className="font-body text-[11px] md:text-sm text-white/60 leading-relaxed mb-8">
              O caimento perfeito não é acidente — é engenharia de moda com alma brasileira.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }} className="mb-8">
              <svg width="80" height="2" viewBox="0 0 80 2" className="text-white/30">
                {[0, 10, 20, 30, 40, 50, 60, 70].map((x) => (
                  <rect key={x} x={x} y="0" width="6" height="1" fill="currentColor" />
                ))}
              </svg>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }}>
              <Link
                to="/produtos"
                className="inline-block font-body text-[10px] tracking-[0.2em] uppercase bg-white text-black px-7 py-3.5 hover:bg-white/90 transition-all duration-300 mono-shine">
                Explorar Peças Shape
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShapeSection;
