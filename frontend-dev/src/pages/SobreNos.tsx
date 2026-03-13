import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import aboutHero from "@/assets/sobre-nos-hero.png";
import azamiMonogram from "@/assets/azami-monogram.jpg";

const SobreNos = () => {
  return (
    <div className="min-h-screen bg-[#FDFCFB] selection:bg-black/5">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={aboutHero} 
            alt="Atelier Azami" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-[10px] md:text-[12px] tracking-[0.4em] uppercase text-white/90 mb-6"
          >
            Nossa Essência
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-display text-4xl md:text-7xl lg:text-8xl font-light text-white leading-tight"
          >
            Beleza que <br />
            <span className="italic font-serif">Empodera</span>
          </motion.h1>
        </div>

        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: "100px" }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent to-white/40"
        />
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-8 leading-tight">
                A Alma da <br />
                <span className="italic font-serif text-primary/80">Azami Modas</span>
              </h2>
              <div className="space-y-6 font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  A Azami nasceu de um desejo profundo: transformar a forma como as mulheres se veem no espelho. Não se trata apenas de roupa; trata-se de armadura, de expressão e de autoconfiança.
                </p>
                <p>
                  Nossa curadoria é feita para mulheres que não têm medo de brilhar. Peças autorais com recortes estratégicos, tecidos premium e uma modelagem que celebra cada curva do corpo feminino.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] bg-muted rounded-sm overflow-hidden shadow-2xl"
            >
              <img 
                src={azamiMonogram} 
                alt="Monograma Azami" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#0A0A0A] text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 justify-between items-start mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-md"
            >
              <h3 className="font-display text-2xl md:text-4xl font-light mb-6 tracking-tight">Nossos Pilares</h3>
              <p className="font-body text-sm text-white/60 leading-relaxed">
                Cada detalhe da Azami é pensado para entregar uma experiência de luxo, sofisticação e propósito.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Exclusividade", 
                desc: "Peças com design autoral criadas para destacar sua personalidade única no mundo.",
                num: "01"
              },
              { 
                title: "Qualidade Impecável", 
                desc: "Desde a escolha das fibras até o acabamento final, prezamos pela excelência absoluta.",
                num: "02"
              },
              { 
                title: "Autoamor", 
                desc: "Vestir Azami é um ato de cuidado e celebração da própria beleza e silhueta.",
                num: "03"
              }
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="p-8 border border-white/10 hover:border-primary/50 transition-colors group"
              >
                <span className="font-display text-6xl text-white/5 group-hover:text-primary/10 transition-colors duration-500 block mb-4 italic">
                  {value.num}
                </span>
                <h4 className="font-body text-lg font-medium mb-4 tracking-wide group-hover:text-primary transition-colors">{value.title}</h4>
                <p className="font-body text-sm text-white/40 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 bg-white flex items-center justify-center text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <span className="font-serif text-5xl text-primary/40 opacity-50 block">"</span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-light leading-snug italic px-4">
              A moda é a ferramenta mais poderosa para <br className="hidden md:block"/>
              contar ao mundo quem você é, sem precisar <br className="hidden md:block"/>
              dizer uma única palavra.
            </h2>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              — Manifesto Azami
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-3xl md:text-4xl font-light mb-8">Comece sua Jornada</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/produtos" 
                className="bg-black text-white font-body text-[10px] tracking-[0.3em] uppercase px-10 py-5 hover:bg-black/90 transition-all mono-shine"
              >
                Ver Coleções
              </Link>
              <Link 
                to="/contato" 
                className="bg-transparent border border-black/20 text-black font-body text-[10px] tracking-[0.3em] uppercase px-10 py-5 hover:border-black transition-all"
              >
                Fale Conosco
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SobreNos;
