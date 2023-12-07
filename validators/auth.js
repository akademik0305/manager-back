import {body} from 'express-validator'

const authValidator = [
  body('username', 'Foydalanuvchi nomi 3ta belgidan kam bo`lmasligni kerak').isLength({min: 3}),
  body('password', 'Parol 5ta belgidan kam bo`lmasligni kerak').isLength({min: 5})
]

export default authValidator