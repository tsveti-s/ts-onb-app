export interface Product {
  id: string;
  image: string;
  name: string;
  quantity: string;
  price: {
    amount: string;
    currency: string;
  };
}
