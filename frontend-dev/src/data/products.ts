import model01 from "@/assets/model-01.jpg";
import model02 from "@/assets/model-02.jpg";
import model03 from "@/assets/model-03.jpg";
import model04 from "@/assets/model-04.jpg";
import model05 from "@/assets/model-05.jpg";
import model06 from "@/assets/model-06.jpg";
import model07 from "@/assets/model-07.jpg";
import model08 from "@/assets/model-08.jpg";
import model09 from "@/assets/model-09.jpg";

export type ProductCategory = "night" | "beach" | "bestseller";
export type ProductSize = "P" | "M" | "G" | "GG";
export type ProductColor = string; // More flexible

export interface CartItem {
  product: Product;
  size: ProductSize;
  color?: string; // Color must be tracked in the cart item
  variantId?: number;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  category: ProductCategory[];
  sizes: ProductSize[];
  colors: string[];
  image: string;
  imageHover: string;
  isBestSeller?: boolean;
  variants?: Array<{
    id: number;
    title: string;
    option1: string | null;
    option2: string | null;
    option3?: string | null;
    price: string;
    available?: boolean;
    inventory_quantity?: number;
    inventory_management?: string | null;
  }>;
  optionMapping?: {
    size: string | null;
    color: string | null;
  };
}

export const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Corset Brilho Noturno",
    price: 289,
    description: "Uma peça marcante que une a estrutura clássica do corset a um acabamento luminoso exclusivo.",
    details: ["Estrutura em barbatanas flexíveis", "Tecido premium"],
    category: ["night", "bestseller"],
    sizes: ["P", "M", "G"],
    colors: ["Preto"],
    image: model01,
    imageHover: model02,
    isBestSeller: true,
  }
];

export const formatPrice = (price: number) =>
  `R$ ${price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

// Color map for UI circles
export const colorMap: Record<string, string> = {
  "preto": "#000000",
  "black": "#000000",
  "branco": "#FFFFFF",
  "white": "#FFFFFF",
  "vermelho": "#EA0000",
  "red": "#EA0000",
  "azul": "#0000FF",
  "blue": "#0000FF",
  "verde": "#008000",
  "green": "#008000",
  "champagne": "#E5E7EB",
  "rosa": "#FFC0CB",
  "pink": "#FFC0CB",
  "amarelo": "#FFFF00",
  "bege": "#F5F5DC",
  "marrom": "#A52A2A",
  "roxo": "#800080",
};

export const getColorValue = (colorName: string) => {
  const norm = colorName.toLowerCase().trim();
  return colorMap[norm] || "#000000";
};
