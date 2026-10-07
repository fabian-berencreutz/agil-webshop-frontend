import type { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category?: Category;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
