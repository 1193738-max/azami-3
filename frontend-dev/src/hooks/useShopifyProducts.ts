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
            
            // Extract all options from Shopify data
            const sizeOption = p.options?.find((o: any) => 
              ['tamanho', 'size', 'tam', 'medida'].includes(o.name.toLowerCase())
            );
            
            const colorOption = p.options?.find((o: any) => 
              ['cor', 'color', 'estampa', 'modelo'].includes(o.name.toLowerCase())
            );

            // Dynamically collect ALL other options that aren't Size or Color
            // This ensures we don't lose custom fields like "Tecido" or "Decote"
            const otherOptions = p.options?.filter((o: any) => 
              !['tamanho', 'size', 'tam', 'medida', 'cor', 'color', 'estampa', 'modelo'].includes(o.name.toLowerCase())
            ) || [];

            const sizes = sizeOption?.values || [];
            const colors = colorOption?.values || [];
            
            const tags = p.tags || [];

            return {
              id: p.handle,
              name: p.title,
              price: price,
              description: p.body_html ? p.body_html.replace(/<[^>]+>/g, '') : "",
              details: [
                ...tags,
                ...otherOptions.map((o: any) => `${o.name}: ${o.values.join(', ')}`)
              ],
              category: tags.map((t: string) => t.toLowerCase()),
              sizes: sizes,
              colors: colors,
              image: p.images && p.images[0] ? p.images[0].src : "",
              imageHover: p.images && p.images[1] ? p.images[1].src : (p.images && p.images[0] ? p.images[0].src : ""),
              isBestSeller: tags.some((t: string) => t.toLowerCase().includes("bestseller")),
              variants: p.variants || []
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
