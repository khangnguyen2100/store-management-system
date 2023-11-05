import { ProductProps } from './product';

export type CartType = ProductProps & {
  id: string;
  quantity: number;
  totalPrice: number;
  note: string;
};
export type CartStatus =
  | 'pending'
  | 'confirmCart'
  | 'confirmInfo'
  | 'payment'
  | 'success'
  | 'cancel';
