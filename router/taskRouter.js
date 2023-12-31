import {Router} from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import controller from '../controllers/taskController.js'
const router = new Router()

router.get('/get', authMiddleware, controller.get)
router.post('/create', authMiddleware, controller.create)
router.put('/update/:id', authMiddleware, controller.update)
router.put('/update-category/:id', authMiddleware, controller.update_category)

export default router