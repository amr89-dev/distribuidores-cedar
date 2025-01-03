export interface Product {
  referencia: string;
  marca: string;
  descripcion: string;
  price: number;
  stock: number;
  images?: string[];
}

export interface CartItem extends Partial<Product> {
  qty: number;
}

export interface Customer {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  dealerId?: string;
  types?: string;
}

export interface Order {
  order_id?: string;
  sellerId?: string;
  items: CartItem[];
  customer: Customer;
  totalCartAmount: number;
}

export interface Seller {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
}
