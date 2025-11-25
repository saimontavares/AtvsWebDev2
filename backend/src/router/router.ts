import {Router} from 'express';
import productRouter from '../resources/product/product.router';
import languageRouter from '../resources/language/language.router';
import userRouter from '../resources/user/user.router'
import authRouter from '../resources/auth/auth.router'
import purchaseItemRouter from '../resources/purchaseItem/purchaseItem.router';
import purchaseRouter from '../resources/purchase/purchase.router';

const router = Router();
router.use("/product", productRouter);
router.use("/language", languageRouter);
router.use("/user", userRouter)
router.use("/auth", authRouter)
router.use("/purchaseItem", purchaseItemRouter);
router.use("/purchase", purchaseRouter);

export default router;