import { z } from 'zod';

const createOrderValidationSchema = z.object({
  orderId: z
    .string()
    .uuid({ message: 'Order ID must be a valid UUID' })
    .optional(),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email must be a valid email address' }),
  productId: z.string().min(1, { message: 'Product ID is required' }),
  price: z
    .number()
    .min(0, { message: 'Price cannot be less than 0' })
    .refine((val) => val !== undefined, { message: 'Price is required' }),
  quantity: z
    .number()
    .min(0, { message: 'Quantity cannot be less than 0' })
    .refine((val) => val !== undefined, { message: 'Quantity is required' }),
});

const updateOrderValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email must be a valid email address' })
    .optional(),
  productId: z
    .string()
    .min(1, { message: 'Product ID is required' })
    .optional(),
  price: z
    .number()
    .min(0, { message: 'Price cannot be less than 0' })
    .optional(),
  quantity: z
    .number()
    .min(0, { message: 'Quantity cannot be less than 0' })
    .optional(),
});

export const validateCreateOrder = (data: unknown) => {
  return createOrderValidationSchema.parse(data);
};

export const validateUpdateOrder = (data: unknown) => {
  return updateOrderValidationSchema.parse(data);
};
