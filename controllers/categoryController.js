import Category from "../models/Category.js";
class CategoryController{
  async getAll(req, res){
    try {
      const categories = await Category.find()

      res.status(200).json({
        success: true,
        data: categories
      })

    } catch (e) {
      console.log(e)
      res.status(400).json({
        success: false,
        message: 'categoriyalarni olishda xatolik'
      })
    }
  }
}

export default new CategoryController()