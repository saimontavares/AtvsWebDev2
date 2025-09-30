import {Router} from "express"
import userController from "./user.controller"
const router = Router()

router.get("/", userController.index)
router.post("/", userController.create)

export default router