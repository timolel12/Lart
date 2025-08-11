export interface Order {
  id: number;
  product: Product;
  customerSurname: string;
  customerName: string;
  customerEmail: string;
  customerOrderText: string;
}

export interface Product {
  name: string;
  id: string;
  quantity: number;
}
