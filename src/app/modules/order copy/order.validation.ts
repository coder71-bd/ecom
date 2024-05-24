import { z } from 'zod';

const orderValidationSchema = z.object({
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
  isActive: z.boolean().optional().default(true),
  isDeleted: z.boolean().optional().default(false),
});

export const validateCreateOrder = (data: unknown) => {
  return orderValidationSchema.safeParse(data);
};
