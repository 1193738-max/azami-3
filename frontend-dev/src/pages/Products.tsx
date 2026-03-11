import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ProductCard from "@/components/ProductCard";
import {
  DesktopFilters,
  MobileFilterBar,
  DesktopSort,
  defaultFilters,
  type FiltersState,
} from "@/components/ProductFilters";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categoryLabels: Record<string, string> = {
  night: "Night Out",
  beach: "Beach Chic",
  bestseller: "Best Sellers",
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("cat") as FiltersState["category"];
  const { data: products = [], isLoading } = useShopifyProducts();

  const [filters, setFilters] = useState<FiltersState>({
    ...defaultFilters,
    category: initialCategory || null,
  });

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter((p) => p.category.includes(filters.category!));
    }
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        filters.sizes.some((s) => p.sizes.includes(s))
      );
    }
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        filters.colors.some((c) => p.colors.includes(c))
      );
    }
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 9999) {
      result = result.filter(
        (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }

    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "bestseller":
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return result;
  }, [filters, products]);

  const title = filters.category
    ? categoryLabels[filters.category] || "Produtos"
    : "Todos os Produtos";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-12">
          {/* Page title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 md:mb-12"
          >
            <h1 className="font-display text-3xl md:text-5xl text-foreground">
              {title}
            </h1>
            <p className="font-body text-[11px] tracking-wider text-muted-foreground mt-2">
              {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
            </p>
          </motion.div>

          {/* Mobile filter bar */}
          <MobileFilterBar filters={filters} onChange={setFilters} />

          {/* Desktop sort */}
          <div className="hidden md:flex items-center justify-end mb-8">
            <DesktopSort
              value={filters.sort}
              onChange={(sort) => setFilters((f) => ({ ...f, sort }))}
            />
          </div>

          <div className="flex gap-0 md:gap-4">
            {/* Desktop sidebar filters */}
            <DesktopFilters filters={filters} onChange={setFilters} />

            {/* Product grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-body text-sm text-muted-foreground">
                    Nenhum produto encontrado com os filtros selecionados.
                  </p>
                  <button
                    onClick={() => setFilters(defaultFilters)}
                    className="mt-3 font-body text-xs text-primary hover:underline"
                  >
                    Limpar filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
