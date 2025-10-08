const Category = require('../models/Category');

class CategoryService {


  async getCategories() {
    try {
      const categories = await Category.find({ deleted: false });
      return categories;
    } catch (error) {
      return false;
    }
  }


  async getCategoryById(id) {
    try {
      const category = await Category.findOne({ _id: id, deleted: false });
      return category;
    } catch (error) {
      return false;
    }
  }

  async createCategory(name) {
    try {
      const category = new Category({ name: name }); 
      await category.save();
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteCategory(id) {
    try {
      const category = await Category.findById(id);
      category.deleted = true;
      await category.save();
      return category;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new CategoryService();