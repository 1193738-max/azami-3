import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GuiaMedidas = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-5 md:px-12">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center"
            >
              <h1 className="font-display text-4xl md:text-5xl mb-6">Guia de Medidas</h1>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Encontre o tamanho perfeito para o seu corpo. Utilize as tabelas abaixo como referência para todas as coleções AZAMI MODAS.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left font-body text-xs md:text-sm border-collapse border border-border">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border-b border-r border-border p-4 font-semibold uppercase tracking-wider text-[10px]">Tamanho</th>
                      <th className="border-b border-r border-border p-4 font-semibold uppercase tracking-wider text-[10px]">Busto (cm)</th>
                      <th className="border-b border-r border-border p-4 font-semibold uppercase tracking-wider text-[10px]">Cintura (cm)</th>
                      <th className="border-b border-border p-4 font-semibold uppercase tracking-wider text-[10px]">Quadril (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="border-b border-r border-border p-4">PP (34)</td>
                      <td className="border-b border-r border-border p-4">78 - 82</td>
                      <td className="border-b border-r border-border p-4">58 - 62</td>
                      <td className="border-b border-border p-4">86 - 90</td>
                    </tr>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="border-b border-r border-border p-4">P (36-38)</td>
                      <td className="border-b border-r border-border p-4">84 - 88</td>
                      <td className="border-b border-r border-border p-4">64 - 68</td>
                      <td className="border-b border-border p-4">92 - 96</td>
                    </tr>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="border-b border-r border-border p-4 font-semibold text-primary">M (40-42)</td>
                      <td className="border-b border-r border-border p-4">90 - 94</td>
                      <td className="border-b border-r border-border p-4">70 - 74</td>
                      <td className="border-b border-border p-4">98 - 102</td>
                    </tr>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="border-b border-r border-border p-4">G (44)</td>
                      <td className="border-b border-r border-border p-4">96 - 100</td>
                      <td className="border-b border-r border-border p-4">76 - 80</td>
                      <td className="border-b border-border p-4">104 - 108</td>
                    </tr>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="border-r border-border p-4">GG (46)</td>
                      <td className="border-r border-border p-4">102 - 106</td>
                      <td className="border-r border-border p-4">82 - 86</td>
                      <td className="p-4">110 - 114</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-muted p-6 md:p-8 mt-10 border border-border"
            >
              <h3 className="font-display text-2xl mb-4">Como Medir</h3>
              <div className="grid md:grid-cols-3 gap-6 font-body text-xs text-muted-foreground leading-relaxed">
                <div>
                  <strong className="text-foreground block mb-1">Busto</strong>
                  <p>Masse a fita métrica pelas costas e meça a parte mais larga do busto.</p>
                </div>
                <div>
                  <strong className="text-foreground block mb-1">Cintura</strong>
                  <p>Encontre a parte mais estreita do seu tronco, geralmente acima do umbigo.</p>
                </div>
                <div>
                  <strong className="text-foreground block mb-1">Quadril</strong>
                  <p>Meça a parte mais larga dos quadris, com os pés juntos.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuiaMedidas;
