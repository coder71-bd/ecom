import { FilterQuery } from 'mongoose';
import { Product } from './product.model';
import { TProduct } from './product.interface';

const createProductIntoDB = async (orderData: TProduct) => {
  return Product.create(orderData);
};

const getAllProductsFromDB = async (query: FilterQuery<TProduct>) => {
  return Product.find({ ...query });
};

const getSingleProductFromDB = async (productId: string) => {
  return Product.findOne({ productId });
};

const updateProductIntoDB = async (
  productId: string,
  orderData: Partial<TProduct>,
) => {
  return Product.findOneAndUpdate({ productId }, orderData);
};

const deleteProductFromDB = async (productId: string) => {
  return Product.findOneAndDelete({ productId });
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
