import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Search, Heart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import azamiLogo from "@/assets/azami-logo.png";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchModal from "./SearchModal";

const navLinks = [
  { label: "Todos", href: "/produtos" },
  { label: "Night Out", href: "/produtos?cat=night" },
  { label: "Beach Chic", href: "/produtos?cat=beach" },
  { label: "Best Sellers", href: "/produtos?cat=bestseller" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openCart, totalItems } = useCart();
  const { openWishlist, totalItems: wishlistItems } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[hsl(0_0%_8%)] p-1"
            aria-label="Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="font-body text-[10px] tracking-[0.25em] uppercase text-[hsl(0_0%_35%)] hover:text-[hsl(0_0%_8%)] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo — centered, black on white */}
          {/* Logo — centered, black on white */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img
              src={(() => {
                const settings = (window as any)?.ShopifyThemeSettings || {};
                let url = settings.logoUrl;
                if (!url || typeof url !== 'string' || url.includes('no-image') || url.includes('empty.gif')) {
                  url = settings.fallbackLogoUrl || azamiLogo;
                }
                return url;
              })()}
              alt={ (window as any)?.ShopifyThemeSettings?.shopName || "AZAMI MODAS" }
              className="h-14 md:h-20 w-auto object-contain rounded-sm"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.dataset.failed) {
                  target.dataset.failed = "true";
                  const fallback = ((window as any)?.ShopifyThemeSettings?.fallbackLogoUrl || azamiLogo);
                  if (target.src !== fallback && !target.src.includes(fallback)) {
                      target.src = fallback;
                  } else {
                      target.style.display = 'none'; // se até o fallback falhar
                  }
                }
              }}
            />
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-[hsl(0_0%_35%)] hover:text-[hsl(0_0%_8%)] transition-colors"
              aria-label="Buscar"
            >
              <Search size={16} />
            </button>
            <Link
              to="/conta"
              className="hidden md:block text-[hsl(0_0%_35%)] hover:text-[hsl(0_0%_8%)] transition-colors"
              aria-label="Minha Conta"
            >
              <User size={16} />
            </Link>
            <button
              onClick={openWishlist}
              className="hidden md:block text-[hsl(0_0%_35%)] hover:text-[hsl(0_0%_8%)] transition-colors relative"
              aria-label="Favoritos"
            >
              <Heart size={16} />
              {wishlistItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-[8px] font-body font-semibold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </button>
            <button
              onClick={openCart}
              className="text-[hsl(0_0%_35%)] hover:text-[hsl(0_0%_8%)] transition-colors relative"
              aria-label="Sacola"
            >
              <ShoppingBag size={16} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[hsl(0_0%_8%)] text-white text-[8px] font-body font-semibold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[hsl(0_0%_92%)] overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-body text-xs tracking-[0.25em] uppercase text-[hsl(0_0%_35%)] hover:text-[hsl(0_0%_8%)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center justify-between border-t border-[hsl(0_0%_92%)] pt-5 mt-2">
                <Link
                  to="/conta"
                  className="font-body text-xs tracking-[0.25em] uppercase text-[hsl(0_0%_35%)] hover:text-[hsl(0_0%_8%)] transition-colors flex items-center gap-2"
                >
                  <User size={14} />
                  Minha Conta
                </Link>
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="font-body text-xs tracking-[0.25em] uppercase text-[hsl(0_0%_35%)] hover:text-[hsl(0_0%_8%)] transition-colors flex items-center gap-2"
                >
                  <Search size={14} />
                  Buscar
                </button>
                <button
                  onClick={openWishlist}
                  className="font-body text-xs tracking-[0.25em] relative uppercase text-[hsl(0_0%_35%)] hover:text-[hsl(0_0%_8%)] transition-colors flex items-center gap-2"
                >
                  <Heart size={14} />
                  {wishlistItems > 0 && <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-[8px] font-body font-semibold w-3.5 h-3.5 rounded-full flex items-center justify-center">{wishlistItems}</span>}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
