export interface Product {
  sku: string;
  brand: string;
  description: string;
  price: number;
  stock: number;
  images?: string[];
}

export interface CartItem extends Partial<Product> {
  qty: number;
}
