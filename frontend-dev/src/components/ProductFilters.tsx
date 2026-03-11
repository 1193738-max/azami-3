import { useState, useMemo } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductCategory, ProductSize, ProductColor } from "@/data/products";

interface FiltersState {
  category: ProductCategory | null;
  sizes: ProductSize[];
  colors: ProductColor[];
  priceRange: [number, number];
  sort: string;
}

interface ProductFiltersProps {
  filters: FiltersState;
  onChange: (f: FiltersState) => void;
}

const categories: { value: ProductCategory | null; label: string }[] = [
  { value: null, label: "Todos" },
  { value: "night", label: "Night Out" },
  { value: "beach", label: "Beach Chic" },
  { value: "bestseller", label: "Best Sellers" },
];

const sizes: ProductSize[] = ["P", "M", "G", "GG"];
const colors: { value: ProductColor; label: string; swatch: string }[] = [
  { value: "Preto", label: "Preto", swatch: "bg-[hsl(0_0%_8%)]" },
  { value: "Branco", label: "Branco", swatch: "bg-[hsl(0_0%_95%)] border border-border" },
  { value: "Champagne", label: "Champagne", swatch: "bg-primary" },
  { value: "Estampado", label: "Estampado", swatch: "bg-gradient-to-br from-primary to-secondary" },
];

const sortOptions = [
  { value: "newest", label: "Lançamentos" },
  { value: "price-asc", label: "Menor Preço" },
  { value: "price-desc", label: "Maior Preço" },
  { value: "bestseller", label: "Mais Vendidos" },
];

const priceRanges: { label: string; range: [number, number] }[] = [
  { label: "Todos", range: [0, 9999] },
  { label: "Até R$200", range: [0, 200] },
  { label: "R$200 - R$350", range: [200, 350] },
  { label: "Acima de R$350", range: [350, 9999] },
];

/* ── Desktop Sidebar Filters ── */
export const DesktopFilters = ({ filters, onChange }: ProductFiltersProps) => {
  const update = (partial: Partial<FiltersState>) =>
    onChange({ ...filters, ...partial });

  return (
    <aside className="hidden md:block w-56 shrink-0 space-y-8 pr-8 border-r border-border">
      {/* Category */}
      <FilterSection title="Categoria">
        <div className="space-y-2">
          {categories.map((c) => (
            <button
              key={c.label}
              onClick={() => update({ category: c.value })}
              className={`block font-body text-[11px] tracking-wider transition-colors ${
                filters.category === c.value
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection title="Tamanho">
        <div className="flex gap-2 flex-wrap">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => {
                const next = filters.sizes.includes(s)
                  ? filters.sizes.filter((x) => x !== s)
                  : [...filters.sizes, s];
                update({ sizes: next });
              }}
              className={`font-body text-[10px] tracking-wider w-9 h-9 border transition-colors ${
                filters.sizes.includes(s)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Cor">
        <div className="flex gap-3 flex-wrap">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => {
                const next = filters.colors.includes(c.value)
                  ? filters.colors.filter((x) => x !== c.value)
                  : [...filters.colors, c.value];
                update({ colors: next });
              }}
              className="flex flex-col items-center gap-1"
              title={c.label}
            >
              <span
                className={`w-6 h-6 rounded-full ${c.swatch} transition-all ${
                  filters.colors.includes(c.value)
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : ""
                }`}
              />
              <span className="font-body text-[9px] text-muted-foreground">
                {c.label}
              </span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Preço">
        <div className="space-y-2">
          {priceRanges.map((p) => (
            <button
              key={p.label}
              onClick={() => update({ priceRange: p.range })}
              className={`block font-body text-[11px] tracking-wider transition-colors ${
                filters.priceRange[0] === p.range[0] && filters.priceRange[1] === p.range[1]
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </FilterSection>
    </aside>
  );
};

/* ── Mobile Filter Drawer ── */
export const MobileFilterBar = ({ filters, onChange }: ProductFiltersProps) => {
  const [open, setOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const update = (partial: Partial<FiltersState>) =>
    onChange({ ...filters, ...partial });

  const activeCount =
    (filters.category ? 1 : 0) +
    filters.sizes.length +
    filters.colors.length +
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 9999 ? 1 : 0);

  return (
    <div className="md:hidden">
      {/* Bar */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 border border-border py-2.5 font-body text-[10px] tracking-[0.2em] uppercase text-foreground"
        >
          <SlidersHorizontal size={13} />
          Filtros
          {activeCount > 0 && (
            <span className="ml-1 bg-primary text-primary-foreground text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>

        <div className="relative flex-1">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="w-full flex items-center justify-center gap-2 border border-border py-2.5 font-body text-[10px] tracking-[0.2em] uppercase text-foreground"
          >
            Ordenar
            <ChevronDown size={12} />
          </button>
          <AnimatePresence>
            {sortOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute top-full left-0 right-0 z-30 mt-1 bg-background border border-border shadow-lg"
              >
                {sortOptions.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => {
                      update({ sort: s.value });
                      setSortOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2.5 font-body text-[11px] tracking-wider transition-colors ${
                      filters.sort === s.value
                        ? "text-primary bg-muted/50"
                        : "text-foreground hover:bg-muted/30"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-background border-t border-border rounded-t-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg">Filtros</h3>
                  <button onClick={() => setOpen(false)}>
                    <X size={18} className="text-muted-foreground" />
                  </button>
                </div>

                {/* Category */}
                <FilterSection title="Categoria">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <button
                        key={c.label}
                        onClick={() => update({ category: c.value })}
                        className={`font-body text-[10px] tracking-wider px-4 py-2 border transition-colors ${
                          filters.category === c.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Size */}
                <FilterSection title="Tamanho">
                  <div className="flex gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          const next = filters.sizes.includes(s)
                            ? filters.sizes.filter((x) => x !== s)
                            : [...filters.sizes, s];
                          update({ sizes: next });
                        }}
                        className={`font-body text-[10px] tracking-wider w-11 h-11 border transition-colors ${
                          filters.sizes.includes(s)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Color */}
                <FilterSection title="Cor">
                  <div className="flex gap-4">
                    {colors.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => {
                          const next = filters.colors.includes(c.value)
                            ? filters.colors.filter((x) => x !== c.value)
                            : [...filters.colors, c.value];
                          update({ colors: next });
                        }}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <span
                          className={`w-8 h-8 rounded-full ${c.swatch} transition-all ${
                            filters.colors.includes(c.value)
                              ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                              : ""
                          }`}
                        />
                        <span className="font-body text-[9px] text-muted-foreground">
                          {c.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Price */}
                <FilterSection title="Preço">
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => update({ priceRange: p.range })}
                        className={`font-body text-[10px] tracking-wider px-4 py-2 border transition-colors ${
                          filters.priceRange[0] === p.range[0] &&
                          filters.priceRange[1] === p.range[1]
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                <button
                  onClick={() => setOpen(false)}
                  className="w-full bg-primary text-primary-foreground font-body text-[10px] tracking-[0.25em] uppercase py-3 mt-2"
                >
                  Aplicar Filtros
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Sort Desktop ── */
export const DesktopSort = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="hidden md:flex items-center gap-4">
    <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
      Ordenar:
    </span>
    {sortOptions.map((s) => (
      <button
        key={s.value}
        onClick={() => onChange(s.value)}
        className={`font-body text-[11px] tracking-wider transition-colors ${
          value === s.value ? "text-primary" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {s.label}
      </button>
    ))}
  </div>
);

/* ── Helper ── */
const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h4 className="font-body text-[10px] tracking-[0.25em] uppercase text-foreground/60 mb-3">
      {title}
    </h4>
    {children}
  </div>
);

export const defaultFilters: FiltersState = {
  category: null,
  sizes: [],
  colors: [],
  priceRange: [0, 9999],
  sort: "newest",
};

export type { FiltersState };
