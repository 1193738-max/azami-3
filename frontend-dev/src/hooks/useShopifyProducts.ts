import { useQuery } from "@tanstack/react-query";
import { type Product, fallbackProducts } from "@/data/products";

export const useShopifyProducts = () => {
  return useQuery({
    queryKey: ["shopify-products"],
    queryFn: async (): Promise<Product[]> => {
      // 1. First Attempt: Use data injected directly by theme.liquid (Bulletproof)
      const injectedProducts = (window as any).ShopifyFullProducts;
      
      const processProducts = (rawProducts: any[]) => {
          const inventorySource = (window as any).ShopifyInventory || {};
          const collectionsSource = (window as any).ShopifyCollections || {};
          
          return rawProducts.map((p: any) => {
            const price = p.variants && p.variants[0] ? parseFloat(p.variants[0].price) : 0;
            
            const sizeIdx = (p.options || [])?.findIndex((o: any) => 
               ['tamanho', 'size', 'tam', 'medida', 'tamanho '].includes((typeof o === 'string' ? o : o.name)?.toLowerCase().trim())
            );
            
            const colorIdx = (p.options || [])?.findIndex((o: any) => 
               ['cor', 'color', 'estampa', 'modelo', 'cores'].includes((typeof o === 'string' ? o : o.name)?.toLowerCase().trim())
            );

            // Shopify Liquid 'product | json' might have a different structure for options than 'products.json'
            const sizes = sizeIdx !== -1 ? (p.options[sizeIdx]?.values || (Array.isArray(p.options[sizeIdx]) ? p.options[sizeIdx] : [])) : [];
            const colors = colorIdx !== -1 ? (p.options[colorIdx]?.values || (Array.isArray(p.options[colorIdx]) ? p.options[colorIdx] : [])) : [];
            
            const tagsArray = Array.isArray(p.tags) ? p.tags : (p.tags ? p.tags.split(',').map((t: string) => t.trim()) : []);

            const categories: string[] = [];
            Object.entries(collectionsSource).forEach(([handle, collection]: [string, any]) => {
                if (collection?.products?.includes(p.handle)) {
                    categories.push(handle);
                }
            });

            const lowerTags = tagsArray.map((t: string) => t.toLowerCase().trim());
            if (lowerTags.includes("night") || lowerTags.includes("noite") || lowerTags.includes("night out")) categories.push("night");
            if (lowerTags.includes("beach") || lowerTags.includes("praia") || lowerTags.includes("beach chic")) categories.push("beach");
            if (lowerTags.includes("best") || lowerTags.includes("bestseller") || lowerTags.includes("mais vendido") || lowerTags.includes("mais vendidos")) categories.push("bestseller");

            const productInventory = inventorySource[p.handle] || {};

            // FEATURED IMAGE: Prioritize featured_image or p.image.src
            const featuredImage = p.featured_image || p.image?.src || (p.images && p.images[0]?.src) || (p.images && p.images[0]) || "";
            const secondaryImage = (p.images && p.images[1]?.src) || (p.images && p.images[1]) || featuredImage;

            return {
              id: p.handle || p.id.toString(),
              name: p.title || "Produto sem título",
              price: price,
              description: p.body_html || p.description || "",
              details: tagsArray,
              category: categories as any,
              sizes: sizes,
              colors: colors,
              image: featuredImage,
              imageHover: secondaryImage,
              isBestSeller: categories.includes("bestseller") || categories.includes("best-sellers") || lowerTags.some((t: string) => t.includes("best")),
              variants: (p.variants || []).map((v: any) => {
                const stockInGlobal = productInventory[v.id.toString()];
                const realQty = (stockInGlobal !== undefined && stockInGlobal !== null) ? stockInGlobal : (v.inventory_quantity || 0);
                
                return {
                    ...v,
                    price: v.price?.toString(),
                    inventory_quantity: realQty,
                    available: v.available ?? (realQty > 0 || v.inventory_management === null)
                };
              }),
              optionMapping: {
                size: sizeIdx !== -1 ? `option${sizeIdx + 1}` : null,
                color: colorIdx !== -1 ? `option${colorIdx + 1}` : null
              }
            };
          });
      };

      if (Array.isArray(injectedProducts) && injectedProducts.length > 0) {
        console.log(`Using ${injectedProducts.length} products injected via Liquid.`);
        return processProducts(injectedProducts);
      }

      // 2. Second Attempt: Network Fetch (if Liquid injection failed)
      const endpoints = [
        `/products.json?limit=250&v=${new Date().getTime()}`,
        `/collections/all/products.json?limit=250&v=${new Date().getTime()}`
      ];

      for (const url of endpoints) {
        try {
          console.log(`Fetching products from: ${url}`);
          const res = await fetch(url);
          if (!res.ok) continue;
          
          const data = await res.json();
          if (data && Array.isArray(data.products) && data.products.length > 0) {
            console.log(`Successfully fetched ${data.products.length} products from ${url}`);
            return processProducts(data.products);
          }
        } catch (e) {
          console.error(`Error fetching from ${url}:`, e);
        }
      }
      
      console.warn("Using fallback local products.");
      return fallbackProducts;
    },
    staleTime: 5 * 60 * 1000,
  });
};
