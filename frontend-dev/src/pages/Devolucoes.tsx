import { motion } from "framer-motion";
import { CopyIcon, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WHATSAPP_NUMBER = "5511918439062";

const Devolucoes = () => {
  const [copied, setCopied] = useState(false);

  const copyCNPJ = () => {
    navigator.clipboard.writeText("00.000.000/0001-00");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-5 md:px-12">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto space-y-12">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-4xl md:text-5xl mb-6 border-b border-border pb-6">Trocas & Devoluções</h1>
              
              <div className="prose prose-sm font-body text-muted-foreground leading-relaxed">
                <p className="text-lg text-foreground mb-8">
                  Queremos que sua experiência com a AZAMI seja perfeita. Por isso, nossa política de troca é simples e focada em você.
                </p>

                <h3 className="font-display text-2xl text-foreground mt-10 mb-4">Primeira Troca Grátis (7 Dias)</h3>
                <p>
                  A sua primeira troca é por nossa conta! Você tem <strong>7 dias corridos</strong> após o recebimento da peça para solicitar a devolução gratuita. A etiqueta reversa será enviada para o seu e-mail.
                </p>
                <p>
                  As peças devem estar sem uso, sem lavagem, sem alterações (bainhas, ajustes) e com as tags originais fixadas. Peças com sinais de uso serão devolvidas ao remetente.
                </p>

                <h3 className="font-display text-2xl text-foreground mt-10 mb-4">Como Solicitar</h3>
                <ol className="list-decimal pl-5 space-y-3">
                  <li>Inicie o atendimento informando seu Nome Completo e Número do Pedido.</li>
                  <li>Envie fotos da peça caso haja algum defeito (para agilizar o processo).</li>
                  <li>Aguarde nossa equipe enviar o código de postagem ou agendar a coleta expresso (capital).</li>
                </ol>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 text-center"
            >
              <a 
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Olá! Gostaria de solicitar uma devolução.`}
                target="_blank" 
                rel="noreferrer"
                className="inline-block font-body text-[10px] tracking-[0.2em] uppercase bg-primary text-primary-foreground py-4 px-10 hover:bg-primary/90 transition-colors mono-shine"
              >
                Solicitar Devolução no WhatsApp
              </a>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Devolucoes;
