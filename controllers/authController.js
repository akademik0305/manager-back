import User from '../models/User.js'
import Role from '../models/Role.js'
import bcrypt from 'bcryptjs'
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import secret from '../config.js'

const generateToken = (id, roles) => {
  const payload = {
    id,
    roles
  }

  return jwt.sign(payload, 'secret', {expiresIn: '24h'})
}

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Ro`yhatdan o`tishda xatolik', errors})
      }

      const {username, password} = req.body
      const candidate = await User.findOne({username})

      if (candidate) {
        return res.status(400).json({
          success: false,
          message: 'Bu foydalanuvchi avval ro`yhatdan o`tgan, boshqa nom kiriting'
        })
      }

      const passwordHash = bcrypt.hashSync(password, 7)
      const userRole = await Role.findOne({value: 'User'})
      const user = new User({username: username, password: passwordHash, roles: [userRole.value]})
      await user.save()
      const token = generateToken(user._id, user.roles)
      res.status(200).json({
        message: 'Foydalanuvchi muvvaffaqqitli ro`yhatdan o`tkazildi',
        success: true,
        data: {
          username: user.username,
          token: token
        }
      })

    } catch (e) {
      console.log(e)
      res.status(400).json({
        success: false,
        message: 'Ro`yhatdan o`tishda xatolik'})
    }
  }

  async login(req, res) {
    try {
      const {username, password} = req.body
      const user = await User.findOne({username: username})
      if (!user) {
        return res.status(400).json({
          success: false,
          message: `Bu nomdagi foydalanuvchi topilmadi`
        })
      }

      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({
          success: false,
          message: `Parol xato`
        })
      }

      const token = generateToken(user._id, user.roles)
      res.status(200).json({
        message: 'Muvaffaqqiyatli tizimga kirdingiz',
        success: true,
        data: {
          username: user.username,
          token: token
        }
      })

    } catch (e) {
      console.log(e)
      res.status(400).json({
        success: false,
        message: 'Tizimga kirishda xatolik', e})
    }

  }

  async getUsers(req, res) {
    try {

      const users = await User.find()
      const user = await User.find({_id: req.user.id})

      res.status(200).json({
        success: true,
        data: users,
        user
      })

    } catch (e) {
      console.log(e)
    }

  }
}

export default new AuthController
