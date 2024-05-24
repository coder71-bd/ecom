import { FilterQuery } from 'mongoose';
import { Product } from './product.model';
import { TProduct } from './product.interface';

const createProductIntoDB = async (productData: TProduct) => {
  return Product.create(productData);
};

const getAllProductsFromDB = async (query: FilterQuery<TProduct>) => {
  return Product.find({ ...query });
};

const getSingleProductFromDB = async (productId: string) => {
  return Product.findOne({ productId });
};

const updateProductIntoDB = async (
  productId: string,
  productData: Partial<TProduct>,
) => {
  return Product.findOneAndUpdate({ productId }, productData, { new: true });
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
