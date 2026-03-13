import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Heart, ShoppingBag, ArrowLeft, Plus, Minus, Truck, ArrowRight, ShieldCheck, CreditCard, AlertCircle } from "lucide-react";
import { formatPrice, ProductSize, ProductColor, getColorValue } from "@/data/products";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useShopifyProducts();
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>("");

  const { addItem, openCart } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || null);
      setSelectedColor(product.colors[0] || null);
      setActiveImage(product.image);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <p className="font-body text-sm text-foreground animate-pulse">Carregando produto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h1 className="font-display text-3xl mb-4">Produto não encontrado</h1>
        <Link to="/produtos" className="font-body text-sm text-primary underline">Voltar para a loja</Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const relatedProducts = products.filter(p => p.id !== product.id && p.category.some(c => product.category.includes(c))).slice(0, 4);

  // --- COMPREHENSIVE VARIANT MATCHING ---
  const findVariant = (size: string | null, color: string | null) => {
    if (!product.variants) return null;
    
    return product.variants.find(v => {
      let isMatch = true;
      
      // Match size if applicable
      if (size && product.optionMapping?.size) {
        const vSize = (v as any)[product.optionMapping.size]?.toLowerCase().trim();
        if (vSize !== size.toLowerCase().trim()) isMatch = false;
      }
      
      // Match color if applicable
      if (color && product.optionMapping?.color) {
        const vColor = (v as any)[product.optionMapping.color]?.toLowerCase().trim();
        if (vColor !== color.toLowerCase().trim()) isMatch = false;
      }
      
      return isMatch;
    });
  };

  const currentVariant = findVariant(selectedSize as any, selectedColor as any) || (product.variants && product.variants[0] ? product.variants[0] : null);
  
  // A variant is available if it exists AND its available property is NOT explicitly false
  const isAvailable = currentVariant ? (currentVariant.available !== false) : false;
  const stockCount = currentVariant?.inventory_quantity;

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      toast.error("Por favor, selecione um tamanho");
      return;
    }
    if (product.colors.length > 0 && !selectedColor) {
      toast.error("Por favor, selecione uma cor");
      return;
    }
    if (!isAvailable) {
      toast.error("Esta combinação está esgotada no momento.");
      return;
    }
    
    // Check if adding this will exceed stock
    if (quantity > (stockCount ?? 999)) {
       toast.error(`Desculpe, só temos ${stockCount} un. em estoque.`);
       return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize || "" as any, selectedColor as any); 
    }
    toast.success(`${product.name} adicionado à sacola! ✨`);
    openCart();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 md:pt-32 pb-20">
        <div className="container mx-auto px-5 md:px-12">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-body text-[10px] tracking-wider text-muted-foreground uppercase mb-8 md:mb-12">
            <Link to="/" className="hover:text-foreground transition-colors">Início</Link>
            <ChevronRight size={10} />
            <Link to="/produtos" className="hover:text-foreground transition-colors">Produtos</Link>
            <ChevronRight size={10} />
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-20">
            {/* Image Gallery */}
            <div className="w-full lg:w-[45%] space-y-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={activeImage}
                className="aspect-[3/4] overflow-hidden bg-muted relative"
              >
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover select-none"
                />
                <button
                  onClick={() => toggleItem(product)}
                  className={`absolute top-4 right-4 p-3 rounded-full bg-background/80 backdrop-blur-md transition-colors ${wishlisted ? "text-primary hover:text-primary/70" : "text-foreground/60 hover:text-primary"}`}
                >
                  <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
                </button>
                {!isAvailable && (
                  <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-background/90 text-foreground px-6 py-3 font-body text-[10px] tracking-[0.3em] uppercase border border-border">Esgotado</span>
                  </div>
                )}
              </motion.div>
              
              <div className="grid grid-cols-4 gap-3">
                {product.images?.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-[3/4] overflow-hidden bg-muted transition-all duration-300 ${activeImage === img ? 'opacity-100 ring-1 ring-primary ring-offset-2' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Vista ${i+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col pt-2 md:pt-6">
              {product.isBestSeller && (
                <span className="font-body text-[9px] tracking-[0.2em] uppercase text-primary mb-4 block">Best Seller Destaque</span>
              )}
              <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <p className="font-display text-2xl text-foreground">{formatPrice(product.price)}</p>
                {!isAvailable && (
                  <span className="font-body text-[10px] text-muted-foreground uppercase tracking-widest bg-muted px-3 py-1 border border-border">Sem Stock</span>
                )}
              </div>

              {/* Enhanced Stock Indicator */}
              <div className="mb-8 flex items-center gap-2">
                {isAvailable && stockCount !== undefined && stockCount !== null && (
                   <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${stockCount > 5 ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`} />
                      <span className="font-body text-[10px] tracking-wider uppercase text-muted-foreground">
                        {stockCount > 0 
                          ? `${stockCount} unidades disponíveis em estoque` 
                          : "Quantidade sob encomenda (Consulte disponibilidade)"}
                      </span>
                   </div>
                )}
              </div>


              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-body text-[10px] tracking-wider uppercase text-foreground">Cor: <span className="text-muted-foreground ml-1">{selectedColor}</span></span>
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map(color => {
                      const colorValue = getColorValue(color);
                      const isPattern = colorValue.includes('url');
                      
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color as any)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : 'hover:scale-110'}`}
                          aria-label={`Cor ${color}`}
                        >
                           <span 
                            className={`w-full h-full rounded-full border border-border/20`} 
                            style={{ 
                                backgroundColor: isPattern ? 'transparent' : colorValue,
                                backgroundImage: isPattern ? colorValue : 'none',
                                backgroundSize: 'cover'
                            }} 
                           />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-body text-[10px] tracking-wider uppercase text-foreground">Tamanho selecionado: <span className="text-muted-foreground ml-1">{selectedSize}</span></span>
                    <Link to="/guia-de-medidas" className="font-body text-[9px] uppercase tracking-wider text-muted-foreground hover:text-foreground underline transition-colors">Guia de Medidas</Link>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {product.sizes.map((size) => {
                      // Check availability for this specific size COMBINED with current color
                      const v = findVariant(size as any, selectedColor as any);
                      const isSizeAvailable = v ? (v.available !== false) : false;

                      return (
                        <button
                          key={size}
                          disabled={!isSizeAvailable}
                          onClick={() => setSelectedSize(size as any)}
                          className={`py-3 font-body text-xs transition-colors border relative ${
                            selectedSize === size
                              ? "border-primary bg-primary text-primary-foreground"
                              : isSizeAvailable 
                                ? "border-border text-foreground hover:border-foreground"
                                : "border-border/40 text-muted-foreground/40 cursor-not-allowed overflow-hidden"
                          }`}
                        >
                          {size}
                          {!isSizeAvailable && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-[120%] h-[1px] bg-muted-foreground/30 rotate-[35deg]" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-4 mb-12">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex gap-3 w-full sm:w-auto">
                    {/* Quantity Selector - Thinner on mobile */}
                    <div className="flex items-center border border-border h-14 w-24 sm:w-32 shrink-0">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 sm:w-10 h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"><Minus size={14} /></button>
                      <span className="flex-1 text-center font-body text-sm font-medium">{quantity}</span>
                      <button onClick={() => {
                         if (stockCount !== undefined && stockCount !== null && quantity >= stockCount) {
                             toast.warning(`Limite de estoque atingido (${stockCount} un.)`);
                             return;
                         }
                         setQuantity(quantity + 1);
                      }} className="w-8 sm:w-10 h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"><Plus size={14} /></button>
                    </div>

                    <button 
                      disabled={!isAvailable}
                      onClick={handleAddToCart}
                      className={`flex-1 sm:w-48 h-14 font-body text-[10px] tracking-[0.2em] uppercase bg-transparent text-foreground border border-foreground hover:bg-muted transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <ShoppingBag size={14} />
                      <span className="sm:inline">{isAvailable ? 'Na Sacola' : 'Esgotado'}</span>
                    </button>
                  </div>

                  <button 
                    disabled={!isAvailable}
                    onClick={() => {
                        handleAddToCart();
                    }}
                    className={`w-full sm:flex-1 h-14 font-body text-[10px] tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mono-shine disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isAvailable ? 'Comprar Agora' : 'Indisponível'}
                  </button>
                </div>
              </div>

              {/* Benefits Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 py-6 border-y border-border">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Truck size={18} className="text-primary" />
                  <span className="font-body text-xs">Exclusivo frete rápido Azami Express</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <ShieldCheck size={18} className="text-primary" />
                  <span className="font-body text-xs">Primeira troca grátis em até 7 dias</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground sm:col-span-2">
                  <CreditCard size={18} className="text-primary" />
                  <span className="font-body text-xs">Pagamento Seguro</span>
                </div>
              </div>

              {/* Accordions / Details */}
              <div className="mt-10 pt-10 border-t border-border">
                <h3 className="font-body text-[10px] tracking-wider uppercase text-foreground mb-4">Sobre este produto</h3>
                <div 
                  className="prose prose-sm font-body text-muted-foreground mb-8 leading-relaxed max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                
                <h3 className="font-body text-[10px] tracking-wider uppercase text-foreground mb-4">Detalhes do Produto</h3>
                <ul className="space-y-2">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-body text-xs text-muted-foreground leading-relaxed">
                      <span className="text-primary mt-1">•</span> {detail}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 md:mt-32 container mx-auto px-5 md:px-12">
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <h2 className="font-display text-2xl md:text-3xl text-foreground">Peças que combinam</h2>
              <Link to="/produtos" className="hidden sm:flex items-center gap-2 font-body text-[10px] tracking-[0.15em] uppercase text-primary hover:text-primary/70 transition-colors">
                Ver toda a coleção <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {relatedProducts.map(relProduct => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
