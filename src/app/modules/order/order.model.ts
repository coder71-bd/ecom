import { Schema, model } from 'mongoose';
import { OrderModel, TOrder } from './order.interface';
import { v4 as uuidv4 } from 'uuid';

const orderSchema = new Schema<TOrder, OrderModel>(
  {
    orderId: {
      type: String,
      required: [true, 'Order ID is required'],
      unique: true,
      default: function () {
        return uuidv4();
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    productId: {
      type: String,
      required: [true, 'Product ID is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price can not be less than 0'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity can not be less than 0'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
