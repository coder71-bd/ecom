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

const productValidationSchema = z.object({
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

export const validateProduct = (data: unknown) => {
  return productValidationSchema.parse(data);
};
