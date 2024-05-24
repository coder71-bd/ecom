import { Schema, model } from 'mongoose';
import { OrderModel, TOrder } from './order.interface';
import { v4 as uuidv4 } from 'uuid';
import { ProductServices } from '../product/product.service';

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
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

const validateInventory = async function (productId: string, quantity: number) {
  const product = await ProductServices.getSingleProductFromDB(productId);
  if (!product) {
    throw new Error('Product not found!');
  }
  // is the quantity available?
  if (product.inventory.quantity < quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }
};

const updateStock = async function (productId: string, quantity: number) {
  const product = await ProductServices.getSingleProductFromDB(productId);
  if (product) {
    const remainingQuantity = product.inventory.quantity - quantity;
    await ProductServices.updateProductIntoDB(productId, {
      inventory: {
        quantity: remainingQuantity,
        inStock: remainingQuantity > 0,
      },
    });
  }
};

orderSchema.pre('save', async function (next) {
  await validateInventory(this.productId, this.quantity);
  next();
});

orderSchema.post('save', async function (doc) {
  await updateStock(doc.productId, doc.quantity);
});

orderSchema.statics.isOrderExists = async function (orderId: string) {
  return Order.findOne({ orderId });
};

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
