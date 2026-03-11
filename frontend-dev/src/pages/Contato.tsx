import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WHATSAPP_NUMBER = "5511918439062";

const Contato = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-5 md:px-12 flex items-center">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start max-w-6xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div>
                <h1 className="font-display text-4xl md:text-5xl mb-6">Fale Conosco</h1>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Estamos à disposição para ajudar você a encontrar a peça perfeita, acompanhar seu pedido ou esclarecer qualquer dúvida.
                </p>
              </div>

              <div className="space-y-8 font-body text-sm text-foreground">
                <a href="mailto:azamimoda@gmail.com" className="flex items-start gap-4 hover:text-primary transition-colors group">
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                    <Mail size={16} className="text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div>
                    <strong className="block font-medium mb-1 text-xs uppercase tracking-wider">E-mail Corporativo</strong>
                    <span className="text-muted-foreground">azamimoda@gmail.com</span>
                  </div>
                </a>

                <a href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:text-primary transition-colors group">
                  <div className="w-10 h-10 bg-primary border text-primary-foreground border-primary flex items-center justify-center mono-shine relative overflow-hidden group-hover:bg-primary/90 transition-colors">
                    <Phone size={16} />
                  </div>
                  <div>
                    <strong className="block font-medium mb-1 text-xs uppercase tracking-wider">WhatsApp Atendimento Direto</strong>
                    <span className="text-muted-foreground">+55 11 91843-9062</span>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <strong className="block font-medium mb-1 text-xs uppercase tracking-wider">Sede</strong>
                    <span className="text-muted-foreground">Rio de Janeiro, RJ — By Appointment Only</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form className="space-y-6 bg-muted/30 p-8 border border-border" onSubmit={(e) => { e.preventDefault(); alert('Mensagem enviada com sucesso!'); }}>
                <div className="space-y-2">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground">Nome Completo</label>
                  <input type="text" required className="w-full bg-background border border-border px-4 py-3 font-body text-sm outline-none focus:border-primary transition-colors" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground">E-mail</label>
                    <input type="email" required className="w-full bg-background border border-border px-4 py-3 font-body text-sm outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground">Telefone</label>
                    <input type="tel" className="w-full bg-background border border-border px-4 py-3 font-body text-sm outline-none focus:border-primary transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground">Mensagem</label>
                  <textarea required rows={5} className="w-full bg-background border border-border px-4 py-3 font-body text-sm outline-none focus:border-primary transition-colors resize-none"></textarea>
                </div>

                <button type="submit" className="w-full font-body text-[10px] tracking-[0.25em] uppercase bg-primary text-primary-foreground py-4 hover:bg-primary/90 transition-colors mono-shine">
                  Enviar Mensagem
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contato;
