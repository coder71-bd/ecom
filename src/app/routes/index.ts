import express from 'express';
import { ProductRoutes } from '../modules/product/product.route';
import { OrderRoutes } from '../modules/order/order.route';

const router = express.Router();

router.use('/products', ProductRoutes);
router.use('/orders', OrderRoutes);

const AppRoutes = router;
export default AppRoutes;
