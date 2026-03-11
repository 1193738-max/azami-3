import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import SideCart from "@/components/SideCart";
import SideWishlist from "@/components/SideWishlist";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Account from "./pages/Account";
import Rastreio from "./pages/Rastreio";
import Devolucoes from "./pages/Devolucoes";
import GuiaMedidas from "./pages/GuiaMedidas";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
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
              <Route path="/produto/:id" element={<ProductDetails />} />
              <Route path="/conta" element={<Account />} />
              <Route path="/rastreio" element={<Rastreio />} />
              <Route path="/devolucoes" element={<Devolucoes />} />
              <Route path="/guia-de-medidas" element={<GuiaMedidas />} />
              <Route path="/contato" element={<Contato />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </WishlistProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
