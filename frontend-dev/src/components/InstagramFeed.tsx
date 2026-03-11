import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import model01 from "@/assets/model-01.jpg";
import model02 from "@/assets/model-02.jpg";
import model03 from "@/assets/model-03.jpg";
import model05 from "@/assets/model-05.jpg";
import model07 from "@/assets/model-07.jpg";
import model09 from "@/assets/model-09.jpg";

const InstagramFeed = () => {
  const settings = (window as any)?.ShopifyThemeSettings || {};
  const images = [
    settings.insta1 && typeof settings.insta1 === 'string' && !settings.insta1.includes('no-image') ? settings.insta1 : model01,
    settings.insta2 && typeof settings.insta2 === 'string' && !settings.insta2.includes('no-image') ? settings.insta2 : model03,
    settings.insta3 && typeof settings.insta3 === 'string' && !settings.insta3.includes('no-image') ? settings.insta3 : model05,
    settings.insta4 && typeof settings.insta4 === 'string' && !settings.insta4.includes('no-image') ? settings.insta4 : model09,
    settings.insta5 && typeof settings.insta5 === 'string' && !settings.insta5.includes('no-image') ? settings.insta5 : model07,
    settings.insta6 && typeof settings.insta6 === 'string' && !settings.insta6.includes('no-image') ? settings.insta6 : model02
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="text-center mb-12 px-6">
        <p className="font-body text-[10px] tracking-[0.5em] uppercase text-primary mb-3">
          @azamimodas
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-light text-foreground flex items-center justify-center gap-3">
          <Instagram size={22} className="text-primary" />
          Siga no Instagram
        </h2>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
        {images.map((img, i) => (
          <motion.a
            key={i}
            href="https://www.instagram.com/azamimodas/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group relative aspect-square overflow-hidden"
          >
            <img src={img} alt={`AZAMI MODAS Instagram ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
              <Instagram size={22} className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;
