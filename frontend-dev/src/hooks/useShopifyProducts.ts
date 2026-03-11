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
            
            // Extract real options from Shopify data
            const sizeOption = p.options?.find((o: any) => 
              o.name.toLowerCase() === 'tamanho' || 
              o.name.toLowerCase() === 'size' ||
              o.name.toLowerCase() === 'tam'
            );
            
            const colorOption = p.options?.find((o: any) => 
              o.name.toLowerCase() === 'cor' || 
              o.name.toLowerCase() === 'color'
            );

            // Only use "P", "M", "G" as fallback if NO options exist at all
            // If the product has variants and options, use those real values.
            const sizes = sizeOption?.values || (p.options?.length > 0 ? [] : ["P", "M", "G"]);
            const colors = colorOption?.values || (p.options?.length > 0 ? [] : ["Preto"]);
            
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
