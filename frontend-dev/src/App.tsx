import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import SideCart from "@/components/SideCart";
import SideWishlist from "@/components/SideWishlist";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Rastreio from "./pages/Rastreio";
import Devolucoes from "./pages/Devolucoes";
import GuiaMedidas from "./pages/GuiaMedidas";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";

import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HashRouter>
        <ScrollToTop />
        <WishlistProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <SideCart />
            <SideWishlist />
            <WhatsAppFloating />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/collections/all" element={<Products />} />
              <Route path="/produto/:id" element={<ProductDetails />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/rastreio" element={<Rastreio />} />
              <Route path="/devolucoes" element={<Devolucoes />} />
              <Route path="/guia-de-medidas" element={<GuiaMedidas />} />
              <Route path="/contato" element={<Contato />} />
              {/* Em modo Editor da Shopify, se cair em rota desconhecida, tentamos mostrar a Index para evitar tela de 404 durante edição */}
              <Route path="*" element={((window as any).Shopify?.designMode || (window as any).ShopifyThemeSettings?.designMode) ? <Index /> : <NotFound />} />
            </Routes>
          </CartProvider>
        </WishlistProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
