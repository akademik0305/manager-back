import Task from "../models/Task.js";
import Category from "../models/Category.js";

class taskController {

  async create(req, res) {
    try {
      const {title, description} = req.body
      const user_id = req.user.id
      const category = await Category.findOne({key: 'dont_know'})

      const task = new Task({title, description, user_id, category_key: category.key})
      await task.save()

      res.status(200).json({
        success: true,
        message: 'success',
        data: {task}
      })

    } catch (e) {
      console.log(e)
      res.status(400).json(
        {
          success: false,
          message: 'error'
        }
      )
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id
      const task = req.body
      const newTask = await Task.findByIdAndUpdate(id, task, {new: true})

      if (!newTask) {
        return res.status(404).json({
          success: false,
          message: 'Vazifa topilmadi'
        })
      }

      res.status(200).json({
        success: true,
        message: 'success',
        data: newTask
      })


    } catch (e) {
      console.log(e)
      res.status(400).json(
        {
          success: false,
          message: 'error'
        }
      )
    }
  }
  async update_category(req, res) {
    try {
      const id = req.params.id
      const {category} = req.body
      const newTask = await Task.findByIdAndUpdate(id, {category_key: category}, {new: true})

      if (!newTask) {
        return res.status(404).json({
          success: false,
          message: 'Vazifa topilmadi'
        })
      }

      res.status(200).json({
        success: true,
        message: 'success',
        data: newTask
      })


    } catch (e) {
      console.log(e)
      res.status(400).json(
        {
          success: false,
          message: 'error'
        }
      )
    }
  }


  async get(req, res) {
    try {
      const user_id = req.user.id
      const tasks = await Task.find({user_id})

      if (!tasks) {
        return res.status(400).json({
          success: false,
          message: 'Malumot topilmadi',
          data: tasks
        })
      }

      res.status(200).json({
        success: true,
        message: 'success',
        data: tasks
      })

    } catch (e) {
      console.log(e)
      res.status(400).json(
        {
          success: false,
          message: 'error'
        }
      )
    }
  }
}

export default new taskController()