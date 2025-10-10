const categoryServices = require('../services/categoryServices');
const mongoose = require('mongoose');

class CategoryController {

    /**
     * @swagger
     * tags:
     *   name: Categories
     *   description: API for managing categories
     */

    /**
     * @swagger
     * /categories:
     *   get:
     *     summary: Get all categories
     *     tags: [Categories]
     *     responses:
     *       200:
     *         description: List of all categories
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   _id:
     *                     type: string
     *                     description: Category ID
     *                   name:
     *                     type: string
     *                     description: Category name
     *                   createdAt:
     *                     type: string
     *                     format: date-time
     *                     description: Category creation date
     *                   deleted:
     *                     type: boolean
     *                     description: Category deletion status
     *       500:
     *         description: Server error
     *   post:
     *     summary: Create a new category
     *     tags: [Categories]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Category name
     *     responses:
     *       200:
     *         description: Category created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Success message
     *       400:
     *         description: Missing required fields
     *       500:
     *         description: Server error
     *
     *   /categories/{id}:
     *     get:
     *       summary: Get a category by ID
     *       tags: [Categories]
     *       parameters:
     *         - in: path
     *           name: id
     *           required: true
     *           schema:
     *             type: string
     *           description: Category ID
     *       responses:
     *         200:
     *           description: Category found
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/schemas/Category'
     *         404:
     *           description: Category not found
     *   delete:
     *     summary: Delete a category by ID
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Category ID
     *     responses:
     *       200:
     *         description: Category deleted successfully
     *       404:
     *         description: Category not found
     *       500:
     *         description: Server error
     */

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