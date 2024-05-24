import { Request, Response } from 'express';
import { validateProduct } from './product.validation';
import { ProductServices } from './product.service';
import { ERROR, OK } from '../../utils/responseHelper';
import { FilterQuery } from 'mongoose';
import { TProduct } from './product.interface';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParsedData = validateProduct(productData);
    const result = await ProductServices.createProductIntoDB(zodParsedData);
    return OK(res, result, 'Product created successfully!');
  } catch (err: any) {
    return ERROR(res, err, err.message);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const body: FilterQuery<TProduct> = {};

    if (searchTerm) {
      body.$or = [{ name: new RegExp(searchTerm as string, 'i') }];
    }

    const result = await ProductServices.getAllProductsFromDB(body);

    return OK(
      res,
      result,
      searchTerm
        ? `Products matching search term ${searchTerm} fetched successfully!`
        : 'Products fetched successfully!',
    );
  } catch (err: any) {
    return ERROR(res, err, err.message);
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSingleProductFromDB(productId);

    if (!result) {
      return ERROR(res, null, 'Product not found!');
    }

    return OK(res, result, 'Product fetched successfully!');
  } catch (err: any) {
    return ERROR(res, err, err.message);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateBody = req.body;

    const productExist =
      await ProductServices.getSingleProductFromDB(productId);

    if (!productExist) {
      return ERROR(res, null, 'Product not found!');
    }

    const result = await ProductServices.updateProductIntoDB(
      productId,
      updateBody,
    );

    return OK(res, result, 'Product updated successfully!');
  } catch (err: any) {
    return ERROR(res, err, err.message);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    await ProductServices.deleteProductFromDB(productId);

    return OK(res, null, 'Product deleted successfully!');
  } catch (err: any) {
    return ERROR(res, err, err.message);
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
