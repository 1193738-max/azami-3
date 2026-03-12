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
          const inventorySource = (window as any).ShopifyInventory || {};
          const collectionsSource = (window as any).ShopifyCollections || {};

          return data.products.map((p: any) => {
            const price = p.variants && p.variants[0] ? parseFloat(p.variants[0].price) : 0;
            
            const sizeIdx = p.options?.findIndex((o: any) => 
              ['tamanho', 'size', 'tam', 'medida'].includes(o.name.toLowerCase())
            );
            
            const colorIdx = p.options?.findIndex((o: any) => 
              ['cor', 'color', 'estampa', 'modelo'].includes(o.name.toLowerCase())
            );

            const sizes = sizeIdx !== -1 ? p.options[sizeIdx].values : [];
            const colors = colorIdx !== -1 ? p.options[colorIdx].values : [];
            
            const tags = p.tags || [];

            // Map product to categories based on Shopify Collections
            const categories: string[] = [];
            Object.entries(collectionsSource).forEach(([handle, collection]: [string, any]) => {
                if (collection.products.includes(p.handle)) {
                    categories.push(handle);
                }
            });

            // Compatibility with existing local tags for backward compatibility if needed
            if (tags.some((t: string) => t.toLowerCase().includes("night"))) categories.push("night");
            if (tags.some((t: string) => t.toLowerCase().includes("beach"))) categories.push("beach");
            if (tags.some((t: string) => t.toLowerCase().includes("bestseller"))) categories.push("bestseller");

            const productInventory = inventorySource[p.handle] || {};

            return {
              id: p.handle,
              name: p.title,
              price: price,
              description: p.body_html ? p.body_html.replace(/<[^>]+>/g, '') : "",
              details: tags,
              category: categories as any,
              sizes: sizes,
              colors: colors,
              image: p.images && p.images[0] ? p.images[0].src : "",
              imageHover: p.images && p.images[1] ? p.images[1].src : (p.images && p.images[0] ? p.images[0].src : ""),
              isBestSeller: categories.includes("bestseller") || categories.includes("best-sellers") || tags.some((t: string) => t.toLowerCase().includes("bestseller")),
              variants: p.variants.map((v: any) => {
                const stockInGlobal = productInventory[v.id.toString()];
                const realQty = (stockInGlobal !== undefined && stockInGlobal !== null) ? stockInGlobal : v.inventory_quantity;
                
                return {
                    ...v,
                    price: v.price?.toString(),
                    inventory_quantity: realQty,
                    available: v.available ?? (realQty > 0 || v.inventory_management === null)
                };
              }) || [],
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
