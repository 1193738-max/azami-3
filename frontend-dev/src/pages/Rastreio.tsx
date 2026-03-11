import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Rastreio = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-5 md:px-12 flex items-center">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto space-y-12">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <PackageSearch size={32} className="mx-auto mb-6 text-primary" />
              <h1 className="font-display text-4xl md:text-5xl mb-4">Rastreio de Pedidos</h1>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Acompanhe a entrega do seu look AZAMI. Insira o código de rastreamento enviado para o seu e-mail.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => { e.preventDefault(); alert('Rastreio integrado em breve!'); }}>
                <input
                  type="text"
                  required
                  placeholder="EX: AZ123456789BR"
                  className="flex-1 border-b border-border bg-transparent py-4 px-2 font-body text-sm outline-none focus:border-primary transition-colors uppercase placeholder:normal-case placeholder:text-muted-foreground/50"
                />
                <button
                  type="submit"
                  className="font-body text-[10px] tracking-[0.2em] uppercase bg-primary text-primary-foreground py-4 px-8 hover:bg-primary/90 transition-colors mono-shine whitespace-nowrap"
                >
                  Buscar Pedido
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-muted px-6 py-8 border border-border"
            >
              <h3 className="font-display text-2xl mb-4">Frete Azami Express</h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed space-y-2">
                <span className="block">• Capital e Região Metropolitana: Entrega em até 2 dias úteis.</span>
                <span className="block">• Interior e Outros Estados: Entrega em até 5 dias úteis.</span>
                <span className="block mt-4 text-[10px] uppercase tracking-wider">Atenção: Peças artesanais (sob encomenda) possuem prazo adicional de 10 dias de produção.</span>
              </p>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rastreio;
