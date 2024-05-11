//PRODUCT

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
  quantity?: number;
}

//USER

export interface User{
  _id: string
  name: string,
  email: string,
  is_admin: boolean,
}

//ORDER

export interface OrderLine {
  product_id: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  user_id: User;
  total: number;
  createdAt: string;
}

//DATA RESPONSE

export interface OrderData {
  order: Order;
  orderLines: OrderLine[];
}
export interface ProductsResponse{
  total: number;
  page: number;
  limit: number;
  category: string[];
  products: Product[];
}

export interface MostSoldProduct {
  totalQuantity: number;
  totalIncome: number;
  count: number;
  product: Product;
}

export interface UserWithMostOrders {
  totalOrders: number;
  totalAmount: number;
  user: User;
}

export interface AnalyticsResponse{
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalSales: number;
  mostSoldProduct: MostSoldProduct;
  usersWithMostOrders: UserWithMostOrders[];
}