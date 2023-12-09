import Task from "../models/Task.js";

class taskController {

  async create(req, res) {
    try {
      const {title, description} = req.body
      const user_id = req.user.id

      const task = new Task({title, description, user_id})
      await task.save()

      res.status(200).json({
        message: 'success',
        data: {task}
      })

    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'error'})
    }
  }

  async update(req, res) {
    try {


    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'error'})
    }
  }

  async get(req, res) {
    try {
      const user_id = req.user.id
      const tasks = await Task.find({user_id})

      if(!tasks) {
        return res.status(400).json({
          message: 'Malumot topilmadi',
          data: tasks
        })
      }

      res.status(200).json({
        message: 'success',
        data: tasks
      })

    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'error'})
    }
  }
}

export default new taskController()