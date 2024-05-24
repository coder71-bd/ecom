import { Schema, model } from 'mongoose';
import { ProductModel, TProduct } from './product.interface';
import { v4 as uuidv4 } from 'uuid';

const productSchema = new Schema<TProduct, ProductModel>(
  {
    productId: {
      type: String,
      required: [true, 'Product ID is required'],
      unique: true,
      default: function () {
        return uuidv4();
      },
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price can not be less than 0'],
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    variants: {
      type: [
        {
          type: {
            type: String,
            required: [true, 'Type is required'],
          },
          value: {
            type: String,
            required: [true, 'Value is required'],
          },
        },
      ],
      default: [],
    },
    inventory: {
      quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity can not be less than 0'],
      },
      inStock: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

export const Product = model<TProduct, ProductModel>('Product', productSchema);
