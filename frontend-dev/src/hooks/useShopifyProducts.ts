import { useQuery } from "@tanstack/react-query";
import { type Product, fallbackProducts } from "@/data/products";

export const useShopifyProducts = () => {
  return useQuery({
    queryKey: ["shopify-products"],
    queryFn: async (): Promise<Product[]> => {
      try {
        const res = await fetch("/products.json?limit=250");
        if (!res.ok) {
          throw new Error("Failed fetching from Shopify");
        }
        const data = await res.json();
        
        if (data && Array.isArray(data.products) && data.products.length > 0) {
          return data.products.map((p: any) => {
            const price = p.variants && p.variants[0] ? parseFloat(p.variants[0].price) : 0;
            
            // Map option names to their positions (1, 2, 3)
            const sizeIdx = p.options?.findIndex((o: any) => 
              ['tamanho', 'size', 'tam', 'medida'].includes(o.name.toLowerCase())
            );
            
            const colorIdx = p.options?.findIndex((o: any) => 
              ['cor', 'color', 'estampa', 'modelo'].includes(o.name.toLowerCase())
            );

            const sizes = sizeIdx !== -1 ? p.options[sizeIdx].values : [];
            const colors = colorIdx !== -1 ? p.options[colorIdx].values : [];
            
            const tags = p.tags || [];

            return {
              id: p.handle,
              name: p.title,
              price: price,
              description: p.body_html ? p.body_html.replace(/<[^>]+>/g, '') : "",
              details: tags,
              category: tags.map((t: string) => t.toLowerCase()),
              sizes: sizes,
              colors: colors,
              image: p.images && p.images[0] ? p.images[0].src : "",
              imageHover: p.images && p.images[1] ? p.images[1].src : (p.images && p.images[0] ? p.images[0].src : ""),
              isBestSeller: tags.some((t: string) => t.toLowerCase().includes("bestseller")),
              variants: p.variants.map((v: any) => ({
                ...v,
                // Ensure price is a string for consistency
                price: v.price?.toString(),
                // Inventory quantity is crucial
                inventory_quantity: v.inventory_quantity ?? 0,
                // Availability flag
                available: v.available ?? (v.inventory_quantity > 0 || v.inventory_management === null)
              })) || [],
              optionMapping: {
                size: sizeIdx !== -1 ? `option${sizeIdx + 1}` : null,
                color: colorIdx !== -1 ? `option${colorIdx + 1}` : null
              }
            };
          });
        }
        
        throw new Error("No products found");
      } catch (e) {
        console.warn("Using fallback local products.", e);
        return fallbackProducts;
      }
    },
    staleTime: 5 * 60 * 1000, 
  });
};
