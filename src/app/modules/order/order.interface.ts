import { Model } from 'mongoose';

export type TOrder = {
  orderId?: string;
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

export interface OrderModel extends Model<TOrder> {}
