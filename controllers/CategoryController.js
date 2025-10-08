const categoryServices = require('../services/categoryServices');
const mongoose = require('mongoose');

class CategoryController {

    async getCategories(req, res) {
        const response = await categoryServices.getCategories();
        if (!response) {
            return res.status(500).json({ message: 'Category not found' });
        } else {
            return res.status(200).json(response);
        }
    }

    async getCategoryByID(req, res) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const response = await categoryServices.getCategoryById(id);
        if (!response) {
            return res.status(500).json({ message: 'Category not found' });
        } else {
            return res.status(200).json(response);
        }
    }

    async createCategory(req, res) {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        let result = await categoryServices.createCategory(name);

        if (result) {
            res.status(200).json({ message: 'Category created successfully' });
        } else {
            res.status(500).json({ message: 'Error creating category' });
        }
    }

    async deleteCategory(req, res) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const response = await categoryServices.deleteCategory(id);

        if (!response) {
            return res.status(500).json({ message: 'Category not found' });
        } else {
            return res.status(200).json(response);
        }
    }

}

module.exports = new CategoryController();