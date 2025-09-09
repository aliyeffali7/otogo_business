// src/components/main/productCatalogue/types.ts
export type Product = {
  id: number | string;
  name: string;
  brand?: string;        // FE göstərilişi; backend-də manufacturer-dən map edirik
  category?: string;
  price_azn?: number;    // backend 'price' → FE 'price_azn'
  imageUrl?: string;
  images?: string[];
  description?: string;
  rating?: number;
  ratingCount?: number;
  branchId?: number | string;
  isHidden?: boolean;   
};
