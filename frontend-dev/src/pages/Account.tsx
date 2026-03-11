import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Account = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-5 md:px-12 flex items-center">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start max-w-6xl mx-auto">
            {/* Login */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h1 className="font-display text-4xl mb-4">Acesso</h1>
                <p className="font-body text-sm text-muted-foreground">
                  Se você já tem uma conta, faça seu login.
                </p>
              </div>

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Login Integrado em Breve!'); }}>
                <div className="space-y-2">
                  <label className="font-body text-[10px] tracking-wider uppercase text-foreground">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border-b border-border bg-transparent py-2 font-body text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-[10px] tracking-wider uppercase text-foreground">
                    Senha
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full border-b border-border bg-transparent py-2 font-body text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="accent-primary" />
                    <span className="font-body text-muted-foreground group-hover:text-foreground">Lembrar-me</span>
                  </label>
                  <a href="#" className="font-body text-muted-foreground hover:text-primary underline">Esqueci minha senha</a>
                </div>
                <button
                  type="submit"
                  className="w-full font-body text-[10px] tracking-[0.2em] uppercase bg-primary text-primary-foreground py-4 hover:bg-primary/90 transition-colors mt-6 mono-shine"
                >
                  Entrar
                </button>
              </form>
            </motion.div>

            {/* Register */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8 h-full flex flex-col justify-center"
            >
              <div>
                <h2 className="font-display text-4xl mb-4">Nova Cliente</h2>
                <p className="font-body text-sm text-muted-foreground">
                  Crie sua conta para acompanhar seus pedidos e criar sua wishlist.
                </p>
              </div>

              <div className="space-y-4 flex-1">
                <ul className="space-y-3 font-body text-xs text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">✨ Acesso a pré-vendas exclusivas</li>
                  <li className="flex items-center gap-2">🛍️ Acompanhamento rápido de pedidos</li>
                  <li className="flex items-center gap-2">💛 Salve suas peças favoritas</li>
                  <li className="flex items-center gap-2">📦 Check-out direto no WhatsApp mais rápido</li>
                </ul>

                <button
                  onClick={() => alert('Cadastro Integrado em Breve!')}
                  className="w-full font-body text-[10px] tracking-[0.2em] uppercase bg-transparent text-foreground border border-foreground py-4 hover:bg-muted transition-colors"
                >
                  Criar minha conta
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
