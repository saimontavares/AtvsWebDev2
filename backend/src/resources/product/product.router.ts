import { Router } from "express"
import productController from "./product.controller"
import { productSchema } from "./product.schema"
import { validate } from "../../middlewares/validate"
import checkAuthorization from "../../middlewares/checkAuthorization"

const router = Router()

router.get("/", productController.index)
router.post(
  "/",
  checkAuthorization,
  validate(productSchema),
  productController.create,
)
router.get("/:id", productController.read)
router.put("/:id", checkAuthorization, productController.update)
router.delete("/:id", checkAuthorization, productController.remove)

export default router
