import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { ProductSize } from "@/data/products";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Link to={`/produto/${product.id}`} className="block h-full w-full">
          <img
            src={isHovered ? product.imageHover : product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Best Seller badge */}
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 font-body text-[9px] tracking-[0.2em] uppercase bg-primary text-primary-foreground px-2.5 py-1">
            Best Seller
          </span>
        )}

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleItem(product);
            if (!wishlisted) {
              toast.success(`${product.name} salvo nos Favoritos 💛`);
            } else {
              toast(`${product.name} removido dos Favoritos`);
            }
          }}
          className={`absolute top-3 right-3 p-1.5 transition-colors z-10 ${wishlisted ? "text-primary hover:text-primary/70" : "text-foreground/60 hover:text-primary"}`}
          aria-label="Favoritar"
        >
          <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
        </button>

        {/* Quick Add overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {/* Size selector */}
          <div className="flex items-center justify-center gap-2 mb-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`font-body text-[10px] tracking-wider w-8 h-8 border transition-colors ${
                  selectedSize === size
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            onClick={() => addItem(product, selectedSize)}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body text-[10px] tracking-[0.2em] uppercase py-2.5 hover:bg-primary/90 transition-colors"
          >
            <ShoppingBag size={13} />
            Adicionar
          </button>
        </div>
      </div>

      {/* Info */}
      <Link to={`/produto/${product.id}`} className="mt-3 space-y-1 block group-hover:opacity-80 transition-opacity">
        <h3 className="font-body text-[11px] md:text-xs tracking-wide text-foreground/80 truncate">
          {product.name}
        </h3>
        <p className="font-display text-sm md:text-base text-foreground">
          {formatPrice(product.price)}
        </p>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
