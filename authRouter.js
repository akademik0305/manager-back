import {Router} from 'express'
import controller from "./authController.js";
import authValidator from "./validators/auth.js";
import {check} from "express-validator";

const router = new Router()

router.post('/registration', [
  check('username', 'Foydanaluvchi nomi 3ta belgidan kam bo`lmasligi kerak').isLength({min: 3}),
  check('password', 'Parol 5ta belgidan kam bo`lmasligi kerak').isLength({min: 5})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)

export default router

