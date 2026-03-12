import { useQuery } from "@tanstack/react-query";
import { type Product, fallbackProducts } from "@/data/products";

export const useShopifyProducts = () => {
  return useQuery({
    queryKey: ["shopify-products"],
    queryFn: async (): Promise<Product[]> => {
      const endpoints = [
        `/products.json?limit=250&v=${new Date().getTime()}`,
        `/collections/all/products.json?limit=250&v=${new Date().getTime()}`
      ];

      let lastError = null;

      for (const url of endpoints) {
        try {
          console.log(`Fetching products from: ${url}`);
          const res = await fetch(url);
          if (!res.ok) continue;
          
          const data = await res.json();
          if (!data || !Array.isArray(data.products) || data.products.length === 0) {
            console.warn(`Endpoint ${url} returned no products.`);
            continue;
          }

          const inventorySource = (window as any).ShopifyInventory || {};
          const collectionsSource = (window as any).ShopifyCollections || {};

          console.log(`Successfully fetched ${data.products.length} products from ${url}`);

          return data.products.map((p: any) => {
            const price = p.variants && p.variants[0] ? parseFloat(p.variants[0].price) : 0;
            
            const sizeIdx = (p.options || [])?.findIndex((o: any) => 
              ['tamanho', 'size', 'tam', 'medida', 'tamanho '].includes(o.name?.toLowerCase().trim())
            );
            
            const colorIdx = (p.options || [])?.findIndex((o: any) => 
              ['cor', 'color', 'estampa', 'modelo', 'cores'].includes(o.name?.toLowerCase().trim())
            );

            const sizes = sizeIdx !== -1 ? p.options[sizeIdx]?.values || [] : [];
            const colors = colorIdx !== -1 ? p.options[colorIdx]?.values || [] : [];
            
            const tagsString = p.tags || "";
            const tagsArray = typeof tagsString === 'string' 
              ? tagsString.split(',').map(tag => tag.trim()) 
              : (Array.isArray(tagsString) ? tagsString : []);

            const categories: string[] = [];
            Object.entries(collectionsSource).forEach(([handle, collection]: [string, any]) => {
                if (collection?.products?.includes(p.handle)) {
                    categories.push(handle);
                }
            });

            const lowerTags = tagsArray.map(t => t.toLowerCase().trim());
            if (lowerTags.includes("night") || lowerTags.includes("noite") || lowerTags.includes("night out")) categories.push("night");
            if (lowerTags.includes("beach") || lowerTags.includes("praia") || lowerTags.includes("beach chic")) categories.push("beach");
            if (lowerTags.includes("best") || lowerTags.includes("bestseller") || lowerTags.includes("mais vendido") || lowerTags.includes("mais vendidos")) categories.push("bestseller");

            const productInventory = inventorySource[p.handle] || {};

            // FEATURED IMAGE LOGIC: 
            // 1. Check p.image.src (Shopify usually puts the featured image here)
            // 2. Fallback to the first image in p.images
            const featuredImage = p.image?.src || (p.images && p.images[0]?.src) || "";
            const secondaryImage = (p.images && p.images[1]?.src) || featuredImage;

            return {
              id: p.handle || p.id.toString(),
              name: p.title || "Produto sem título",
              price: price,
              description: p.body_html ? p.body_html.replace(/<[^>]+>/g, '') : "",
              details: tagsArray,
              category: categories as any,
              sizes: sizes,
              colors: colors,
              image: featuredImage,
              imageHover: secondaryImage,
              isBestSeller: categories.includes("bestseller") || categories.includes("best-sellers") || lowerTags.some(t => t.includes("best")),
              variants: (p.variants || []).map((v: any) => {
                const stockInGlobal = productInventory[v.id.toString()];
                const realQty = (stockInGlobal !== undefined && stockInGlobal !== null) ? stockInGlobal : v.inventory_quantity;
                
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
        } catch (e) {
          lastError = e;
          console.error(`Error fetching from ${url}:`, e);
        }
      }
      
      console.warn("Using fallback local products due to errors or empty response.", lastError);
      return fallbackProducts;
    },
    staleTime: 1 * 60 * 1000, // Reduced to 1 minute for better sync during testing
  });
};
