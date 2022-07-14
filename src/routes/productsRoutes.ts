import { Router } from 'express';

import ProductsController from '../controllers/productsController';
import validationProduct from '../middlewares/validateProducts';

const router = Router();

const productsController = new ProductsController();

router.get('/', productsController.getAll);
router.post('/', validationProduct, productsController.create);

export default router;