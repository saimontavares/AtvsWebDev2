import {Router} from 'express';
import productRouter from '../resources/product/product.router';
import languageRouter from '../resources/language/language.router';

const router = Router();
router.use("/product", productRouter);
router.use("/language", languageRouter);

export default router;