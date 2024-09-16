export interface Product {
  referencia: string;
  marca: string;
  descripcion: string;
  precio: number;
  saldo: number;

  images?: string[];
}

export interface CartItem extends Product {
  quantity?: number;
}
