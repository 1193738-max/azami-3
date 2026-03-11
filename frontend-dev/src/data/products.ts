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
export type ProductColor = "Preto" | "Branco" | "Champagne" | "Estampado";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  category: ProductCategory[];
  sizes: ProductSize[];
  colors: ProductColor[];
  image: string;
  imageHover: string;
  isBestSeller?: boolean;
}

export const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Corset Brilho Noturno",
    price: 289,
    description: "Uma peça marcante que une a estrutura clássica do corset a um acabamento luminoso exclusivo. Pensado para destacar a silhueta com elegância e um toque de ousadia, é a escolha perfeita para noites inesquecíveis.",
    details: ["Estrutura em barbatanas flexíveis para maior conforto", "Tecido premium com fios de lurex", "Fechamento em zíper invisível nas costas", "Forro interno suave ao toque"],
    category: ["night", "bestseller"],
    sizes: ["P", "M", "G"],
    colors: ["Preto"],
    image: model01,
    imageHover: model02,
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Vestido Champagne Glow",
    price: 459,
    description: "A essência do luxo em forma de vestido. Com uma modelagem que abraça o corpo e um tom champagne sofisticado, esta peça reflete a luz de forma deslumbrante, garantindo que você seja o centro das atenções.",
    details: ["Decote degagê fluido e elegante", "Alças finas ajustáveis", "Fenda lateral estratégica para movimento", "Acabamento duplo para evitar transparência"],
    category: ["night"],
    sizes: ["P", "M", "G", "GG"],
    colors: ["Champagne"],
    image: model03,
    imageHover: model04,
  },
  {
    id: "3",
    name: "Conjunto Crochê Areia",
    price: 349,
    description: "O clima tropical traduzido em uma obra de arte feita à mão. Este conjunto vazado exala frescor e sensualidade sem esforço, perfeito para sunsets à beira-mar ou pool parties exclusivas.",
    details: ["Produzido de forma artesanal e exclusiva", "Trama vazada de crochê em fio premium", "Top cropped com amarração ajustável", "Saia com cós elástico para maior adaptação"],
    category: ["beach", "bestseller"],
    sizes: ["P", "M", "G"],
    colors: ["Branco"],
    image: model05,
    imageHover: model06,
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Saída de Praia Rendada",
    price: 199,
    description: "Leveza e transparência na medida certa. Uma saída de praia alongada que adiciona instantaneamente uma camada de sofisticação ao seu look beachwear, fluindo lindamente com a brisa.",
    details: ["Renda chantilly de toque macio", "Modelagem ampla e esvoaçante", "Faixa para acinturar inclusa", "Comprimento maxi luxuoso"],
    category: ["beach"],
    sizes: ["M", "G", "GG"],
    colors: ["Branco", "Champagne"],
    image: model07,
    imageHover: model08,
  },
  {
    id: "5",
    name: "Top Corset Estruturado",
    price: 259,
    description: "Arquitetura e moda se encontram nesta peça statement. Com recortes precisos e uma estrutura que empodera, este top transforma instantaneamente calças de alfaiataria ou jeans em looks incríveis.",
    details: ["Decote com formato geométrico exclusivo", "Acabamento fosco sofisticado", "Sustentação aprimorada sem bojo", "Modelagem cropped que valoriza a cintura"],
    category: ["night", "bestseller"],
    sizes: ["P", "M", "G"],
    colors: ["Preto"],
    image: model09,
    imageHover: model01,
    isBestSeller: true,
  },
  {
    id: "6",
    name: "Vestido Midi Noite",
    price: 389,
    description: "O clássico vestido noite repensado para a mulher moderna. O comprimento midi traz elegância enquanto o decote contemporâneo garante o fator surpresa perfeito para jantares ou eventos.",
    details: ["Comprimento midi elegante", "Fenda frontal discreta", "Tecido com caimento fluido", "Design atemporal e versátil"],
    category: ["night"],
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Champagne"],
    image: model02,
    imageHover: model03,
  },
  {
    id: "7",
    name: "Biquíni Crochê Pérola",
    price: 189,
    description: "Detalhes preciosos que fazem a diferença na areia. Um biquíni estruturado em crochê que une estilo boho e toques de brilho perolado para um visual praiano impecável.",
    details: ["Top alongado com amarração forte", "Calcinha em corte asa-delta ou tradicional", "Detalhes entrelaçados em acabamento pérola", "Altamente resistente ao desbotamento salino"],
    category: ["beach"],
    sizes: ["P", "M", "G"],
    colors: ["Branco", "Champagne"],
    image: model04,
    imageHover: model05,
  },
  {
    id: "8",
    name: "Saia Brilho Champagne",
    price: 279,
    description: "Dance a noite inteira com uma peça que captura luz a cada passo. Esta saia possui um brilho sutil e sofisticado, tornando-se o par ideal para tops neutros em ocasiões noturnas.",
    details: ["Corte enviesado que modela o quadril", "Tecido leve com fios reluzentes", "Cós com ajuste invisível", "Comprimento perfeito para saltos ou flats"],
    category: ["night"],
    sizes: ["P", "M", "G"],
    colors: ["Champagne"],
    image: model06,
    imageHover: model07,
  },
  {
    id: "9",
    name: "Conjunto Beach Sunset",
    price: 319,
    description: "Cores que homenageiam o poente. Um conjunto vibrante, fresquinho e descomplicado, feito para a mulher que quer sair da praia diretamente para um evento de final de tarde.",
    details: ["Estampa exclusiva inspirada no entardecer", "Tecido estilo viscolinho que não amassa com facilidade", "Saia em modelagem envelope", "Top cropped ajustável e versátil"],
    category: ["beach", "bestseller"],
    sizes: ["P", "M", "G", "GG"],
    colors: ["Estampado"],
    image: model08,
    imageHover: model09,
    isBestSeller: true,
  },
  {
    id: "10",
    name: "Body Corset Luxo",
    price: 329,
    description: "O impacto visual de um corset com a praticidade de um body. Peça única que contorna a silhueta, sendo ideal para compor visuais intensos, confortáveis e incrivelmente magnéticos.",
    details: ["Abertura e fecho na região inferior", "Malha texturizada premium", "Recortes transparentes em tule invisível", "Zero necessidade de sutiã devido à alta sustentação"],
    category: ["night"],
    sizes: ["P", "M", "G"],
    colors: ["Preto"],
    image: model01,
    imageHover: model04,
  },
  {
    id: "11",
    name: "Vestido Longo Praia",
    price: 299,
    description: "Drama e beleza em uma peça única. Um vestido esvoaçante para quem domina a arte do resort wear. Leve, fluido e perfeitamente fotogênico para suas memórias de verão.",
    details: ["Saia longa plissada maleável", "Cintura com fecho frontal", "Pode ser usado transpassado ou como vestido", "Perfeito para sobreposições em trajes de banho"],
    category: ["beach"],
    sizes: ["M", "G", "GG"],
    colors: ["Branco"],
    image: model05,
    imageHover: model02,
  },
  {
    id: "12",
    name: "Corset Pedrarias",
    price: 419,
    description: "Uma verdadeira joia em forma de roupa. Com cravação manual de pedrarias, este corset ilumina qualquer produção noturna, sendo sinônimo de luxo, exclusividade e imponência feminina.",
    details: ["Cristais bordados manualmente um a um", "Estrutura interna forrada", "Fita de amarração nas costas em cetim reverso", "Peça que exige lavagem delicada a seco"],
    category: ["night", "bestseller"],
    sizes: ["P", "M"],
    colors: ["Preto", "Champagne"],
    image: model03,
    imageHover: model06,
    isBestSeller: true,
  },
];

export const formatPrice = (price: number) =>
  `R$ ${price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
