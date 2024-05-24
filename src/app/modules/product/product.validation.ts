import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string().min(1, { message: 'Variant type is required' }),
  value: z.string().min(1, { message: 'Variant value is required' }),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .min(0, { message: 'Quantity cannot be less than 0' })
    .refine((val) => val !== undefined, { message: 'Quantity is required' }),
  inStock: z.boolean().optional().default(true),
});

const createProductValidationSchema = z.object({
  productId: z
    .string()
    .uuid({ message: 'Product ID must be a valid UUID' })
    .optional(),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  price: z
    .number()
    .min(0, { message: 'Price cannot be less than 0' })
    .refine((val) => val !== undefined, { message: 'Price is required' }),
  tags: z.array(z.string()).optional().default([]),
  category: z.string().min(1, { message: 'Category is required' }),
  variants: z.array(variantValidationSchema).optional().default([]),
  inventory: inventoryValidationSchema,
});

const updateProductValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).optional(),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .optional(),
  price: z
    .number()
    .min(0, { message: 'Price cannot be less than 0' })
    .optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().min(1, { message: 'Category is required' }).optional(),
  variants: z.array(variantValidationSchema).optional(),
  inventory: inventoryValidationSchema.optional(),
});

export const validateCreateProduct = (data: unknown) => {
  return createProductValidationSchema.parse(data);
};

export const validateUpdateProduct = (data: unknown) => {
  return updateProductValidationSchema.parse(data);
};
