import express from 'express';
import { ProductRoutes } from '../modules/product/product.route';

const router = express.Router();

router.use('/product', ProductRoutes);

const AppRoutes = router;
export default AppRoutes;
