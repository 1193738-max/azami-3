import { useQuery } from "@tanstack/react-query";
import { type Product, fallbackProducts } from "@/data/products";

export const useShopifyProducts = () => {
  return useQuery({
    queryKey: ["shopify-products"],
    queryFn: async (): Promise<Product[]> => {
      // Fetch directly from Shopify's AJAX API (only works when served inside Shopify Theme)
      try {
        const res = await fetch("/products.json?limit=250");
        if (!res.ok) {
          throw new Error("Failed fetching from Shopify");
        }
        const data = await res.json();
        
        if (data && Array.isArray(data.products) && data.products.length > 0) {
          return data.products.map((p: any) => {
            // Shopify formats prices in cents or strings, usually variant option has price property
            const price = p.variants && p.variants[0] ? parseFloat(p.variants[0].price) : 0;
            
            // Reconstruct sizes and colors from options
            const sizes = p.options?.find((o: any) => o.name.toLowerCase() === 'tamanho' || o.name.toLowerCase() === 'size')?.values || ["P", "M", "G"];
            const colors = p.options?.find((o: any) => o.name.toLowerCase() === 'cor' || o.name.toLowerCase() === 'color')?.values || ["Preto"];
            
            const tags = p.tags || [];

            return {
              id: p.handle, // For the React app, ID is the handle (slug)
              name: p.title,
              price: price,
              description: p.body_html ? p.body_html.replace(/<[^>]+>/g, '') : "",
              details: tags, // Treat tags as details array
              category: tags.map((t: string) => t.toLowerCase()),
              sizes: sizes,
              colors: colors,
              image: p.images && p.images[0] ? p.images[0].src : "",
              imageHover: p.images && p.images[1] ? p.images[1].src : (p.images && p.images[0] ? p.images[0].src : ""),
              isBestSeller: tags.some((t: string) => t.toLowerCase().includes("bestseller"))
            };
          });
        }
        
        // Se a loja não tem produtos ou não estamos no tema, usar os produtos locais
        throw new Error("No products found, falling back to locals");
      } catch (e) {
        // Fallback for local development and errors
        console.warn("Using fallback local products (Shopify fetch failed or is running locally).", e);
        return fallbackProducts;
      }
    },
    // keep products cached 
    staleTime: 5 * 60 * 1000, 
  });
};
