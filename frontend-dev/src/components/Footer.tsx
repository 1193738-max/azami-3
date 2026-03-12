import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import azamiLogo from "@/assets/azami-logo.png";
import azamiMonogram from "@/assets/azami-monogram.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("E-mail cadastrado com sucesso! ✨");
  };

  return (
    <footer className="bg-[hsl(0_0%_4%)] text-[hsl(0_0%_70%)] border-t border-[hsl(0_0%_10%)] pb-20 md:pb-0">
      <div className="container mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4 pr-0 md:pr-8">
            <img 
              src={azamiMonogram} 
              alt="AZAMI" 
              className="h-20 w-auto mb-6 object-contain invert opacity-90" 
            />
            <p className="font-body text-xs leading-relaxed max-w-sm mb-8">
              Moda feminina autoral com curadoria de tendências. Peças que celebram a sua melhor versão com recortes estratégicos e modelagem perfeita para empoderar.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/azamimodas/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_15%)] flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_15%)] flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_15%)] flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-2">
            <h4 className="font-body text-[10px] tracking-[0.3em] uppercase text-[hsl(0_0%_92%)] mb-6">Explorar</h4>
            <ul className="space-y-4">
              {["Night Collection", "Beach Collection", "Best Sellers", "Promoções"].map((l) => (
                <li key={l}>
                  <a href="#" className="font-body text-xs hover:text-[hsl(0_0%_92%)] transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-2">
            <h4 className="font-body text-[10px] tracking-[0.3em] uppercase text-[hsl(0_0%_92%)] mb-6">Ajuda</h4>
            <ul className="space-y-4">
              {[
                { label: "Rastreio e Frete", path: "/rastreio" },
                { label: "Devoluções", path: "/devolucoes" },
                { label: "Guia de Medidas", path: "/guia-de-medidas" },
                { label: "Fale Conosco", path: "/contato" }
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="font-body text-xs hover:text-[hsl(0_0%_92%)] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="md:col-span-4">
            <h4 className="font-body text-[10px] tracking-[0.3em] uppercase text-[hsl(0_0%_92%)] mb-6">Newsletter VIP</h4>
            <p className="font-body text-xs mb-5 leading-relaxed">
              Assine para receber acesso antecipado a novas coleções e ofertas exclusivas para clientes VIP.
            </p>
            <form onSubmit={handleNewsletter} className="flex mb-8">
              <input
                type="email"
                required
                placeholder="Seu e-mail"
                className="flex-1 bg-[hsl(0_0%_6%)] border border-[hsl(0_0%_18%)] px-4 py-3 font-body text-xs text-[hsl(0_0%_92%)] placeholder:text-[hsl(0_0%_40%)] focus:outline-none focus:border-primary transition-colors"
              />
              <button type="submit" className="bg-primary text-primary-foreground font-body text-[10px] tracking-[0.15em] uppercase px-6 py-3 hover:bg-primary/90 transition-colors">
                Assinar
              </button>
            </form>

            <div className="space-y-3.5">
              <a href="mailto:azamimoda@gmail.com" className="flex items-center gap-3 font-body text-xs hover:text-primary transition-colors">
                <Mail size={14} className="text-primary/70" />
                azamimoda@gmail.com
              </a>
              <a href="https://api.whatsapp.com/send?phone=5511918439062" className="flex items-center gap-3 font-body text-xs hover:text-primary transition-colors">
                <Phone size={14} className="text-primary/70" />
                WhatsApp: +55 11 91843-9062
              </a>
              <span className="flex items-center gap-3 font-body text-xs">
                <MapPin size={14} className="text-primary/70" />
                Rio de Janeiro, RJ — By Appointment Only
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[hsl(0_0%_12%)] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body text-[10px] tracking-wider text-[hsl(0_0%_50%)]">
            © 2026 AZAMI MODAS. Todos os direitos reservados. CNPJ: 00.000.000/0001-00.
          </p>
          <div className="flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/200px-Mastercard_2019_logo.svg.png" alt="Mastercard" className="h-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-3 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Pix_logo.svg/200px-Pix_logo.svg.png" alt="Pix" className="h-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
