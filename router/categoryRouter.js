import {Router} from "express";
import controller from '../controllers/categoryController.js'
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router()

router.get('/', authMiddleware, controller.getAll)

export default router