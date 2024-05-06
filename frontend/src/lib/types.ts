
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  createdAt: Date;
  stripePriceId: string;
  stripeProductId: string;
}

export interface User{
  name: string,
  email: string,
  is_admin: boolean,
}

export interface OrderLine {
  product_id: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  user_id: string;
  createdAt: string;
}

export interface OrderData {
  order: Order;
  orderLines: OrderLine[];
}

