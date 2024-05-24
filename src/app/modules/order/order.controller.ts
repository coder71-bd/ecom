import { Request, Response } from 'express';
import { validateCreateOrder, validateUpdateOrder } from './order.validation';
import { OrderServices } from './order.service';
import { ERROR, OK } from '../../utils/responseHelper';
import { FilterQuery } from 'mongoose';
import { TOrder } from './order.interface';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParsedData = validateCreateOrder(orderData);
    const result = await OrderServices.createOrderIntoDB(zodParsedData);
    return OK(res, result, 'Order created successfully!');
  } catch (err: any) {
    return ERROR(res, err, err.message);
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const body: FilterQuery<TOrder> = {};

    if (email) body.email = email as string;

    const result = await OrderServices.getAllOrdersFromDB(body);

    return OK(res, result, 'Orders fetched successfully!');
  } catch (err: any) {
    return ERROR(res, err, err.message);
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const result = await OrderServices.getSingleOrderFromDB(orderId);

    if (!result) {
      return ERROR(res, null, 'Order not found!');
    }

    return OK(res, result, 'Order fetched successfully!');
  } catch (err: any) {
    return ERROR(res, err, err.message);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { email, productId, price, quantity } = req.body;

    const body: Partial<TOrder> = {};

    const orderExist = await OrderServices.getSingleOrderFromDB(orderId);

    if (!orderExist) {
      return ERROR(res, null, 'Order not found!');
    }

    if (email) body.email = email;
    if (productId) body.productId = productId;
    if (price) body.price = price;
    if (quantity) body.quantity = quantity;

    const zodParsedData = validateUpdateOrder(body);

    const result = await OrderServices.updateOrderIntoDB(
      orderId,
      zodParsedData,
    );

    return OK(res, result, 'Order updated successfully!');
  } catch (err: any) {
    return ERROR(res, err, err.message);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    await OrderServices.deleteOrderFromDB(orderId);

    return OK(res, null, 'Order deleted successfully!');
  } catch (err: any) {
    return ERROR(res, err, err.message);
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
