import { FilterQuery } from 'mongoose';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  return Order.create(orderData);
};

const getAllOrdersFromDB = async (query: FilterQuery<TOrder>) => {
  return Order.find({ ...query });
};

const getSingleOrderFromDB = async (orderId: string) => {
  return Order.findOne({ orderId });
};

const updateOrderIntoDB = async (
  orderId: string,
  orderData: Partial<TOrder>,
) => {
  return Order.findOneAndUpdate({ orderId }, orderData, { new: true });
};

const deleteOrderFromDB = async (orderId: string) => {
  return Order.findOneAndDelete({ orderId });
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
