import { useState, useEffect, useMemo } from "react";
import { Menu, X, ShoppingBag, Search, Heart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import azamiLogo from "@/assets/azami-logo.png";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchModal from "./SearchModal";

const fallbackNavLinks = [
  { label: "Todos", href: "/produtos" },
  { label: "Night Out", href: "/produtos?cat=night-out" },
  { label: "Beach Chic", href: "/produtos?cat=beach-chic" },
  { label: "Best Sellers", href: "/produtos?cat=best-sellers" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openCart, totalItems } = useCart();
  const { openWishlist, totalItems: wishlistItems } = useWishlist();
  const location = useLocation();

  // Dynamically pull navigation from Shopify linklists
  const navLinks = useMemo(() => {
    const shopifyMenu = (window as any).ShopifyNavigation;
    if (shopifyMenu && Array.isArray(shopifyMenu) && shopifyMenu.length > 0) {
      return shopifyMenu.map(link => {
          let href = link.url;
          // Contextual mapping: convert shopify-style /collections/all to /produtos
          if (href === '/collections/all') href = '/produtos';
          // Convert /collections/handlename to /produtos?cat=handlename
          else if (href.startsWith('/collections/')) {
              const handle = href.replace('/collections/', '');
              href = `/produtos?cat=${handle}`;
          }
          return { label: link.title, href: href };
      });
    }
    return fallbackNavLinks;
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const logoUrl = useMemo(() => {
    const settings = (window as any)?.ShopifyThemeSettings || {};
    let url = settings.logoUrl;
    if (!url || typeof url !== 'string' || url.includes('no-image') || url.includes('empty.gif')) {
       url = settings.fallbackLogoUrl || azamiLogo;
    }
    return url;
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-500 ${scrolled ? 'py-2 shadow-sm' : 'py-0 shadow-none border-b border-border/10'}`}>
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-1 transition-transform hover:scale-110"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full ${location.pathname + location.search === link.href ? 'w-full' : ''}`} />
              </Link>
            ))}
          </nav>

          {/* Logo — centered, black on white */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 transition-transform hover:scale-105 duration-300">
            <img
              src={logoUrl}
              alt={(window as any)?.ShopifyThemeSettings?.shopName || "AZAMI MODAS"}
              className="h-14 md:h-18 lg:h-20 w-auto object-contain rounded-sm"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.dataset.failed) {
                   target.dataset.failed = "true";
                   target.src = azamiLogo;
                }
              }}
            />
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
              aria-label="Buscar"
            >
              <Search size={16} />
            </button>
            <Link
              to="/conta"
              className="hidden md:block text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
              aria-label="Minha Conta"
            >
              <User size={16} />
            </Link>
            <button
              onClick={openWishlist}
              className="hidden md:block text-muted-foreground hover:text-foreground transition-all duration-300 relative hover:scale-110"
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
              className="text-muted-foreground hover:text-foreground transition-all duration-300 relative hover:scale-110"
              aria-label="Sacola"
            >
              <ShoppingBag size={16} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-foreground text-background text-[8px] font-body font-semibold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden bg-white border-t border-border overflow-hidden absolute left-0 right-0 shadow-xl"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-all border-b border-border/40 pb-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center justify-between border-t border-border pt-6 mt-2">
                <Link
                  to="/conta"
                  className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <User size={14} />
                  Minha Conta
                </Link>
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Search size={14} />
                  Buscar
                </button>
                <button
                  onClick={openWishlist}
                  className="font-body text-[10px] tracking-[0.25em] relative uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Heart size={14} />
                  {wishlistItems > 0 && <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-[8px] font-body font-semibold w-3.5 h-3.5 rounded-full flex items-center justify-center">{wishlistItems}</span>}
                  Favoritos
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
