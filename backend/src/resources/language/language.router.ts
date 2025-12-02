import { Router } from "express"
import languageController from "./language.controller"

const router = Router()

router.get("/change", languageController.changeLangCookie)

export default router
