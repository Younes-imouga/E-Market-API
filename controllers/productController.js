const productServices = require('../services/productServices');
const categoryServices = require('../services/categoryServices');
const mongoose = require('mongoose');

class ProductController {

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 *
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The product ID
 *         title:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: A brief description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         stock:
 *           type: number
 *           description: The quantity in stock
 *         category:
 *           type: string
 *           description: The ID of the product's category
 *         imageUrl:
 *           type: string
 *           description: URL of the product image
 *         deleted:
 *           type: boolean
 *           description: Whether the product is soft deleted
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - stock
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product created successfully
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       500:
 *         description: Server error
 *
 * /products/{id}:
 *   get:
 *     summary: Get a product by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Product not found
 *
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input or category not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Soft delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid ID format
 *       500:
 *         description: Server error
 *
 * /products/search/{column}/{value}:
 *   get:
 *     summary: Search products by a column and value
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: column
 *         schema:
 *           type: string
 *         required: true
 *         description: The column name to search by (e.g., title, category)
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: The value to match in the specified column
 *     responses:
 *       200:
 *         description: Matching products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */


    async getProducts(req, res) {
        const response = await productServices.getProducts();
        if (!response) {
            return res.status(500).json({ message: 'product not found' });
        } else {
            return res.status(200).json(response);
        }
    }

    async getProductByID(req, res) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const response = await productServices.getProductById(id);
        if (!response) {
            return res.status(500).json({ message: 'product not found' });
        } else {
            return res.status(200).json(response);
        }
    }

    async createProduct(req, res) {
        const { title, description, price, stock, category, imageUrl } = req.body;
        let image = null;

        let categoryExist = await categoryServices.getCategoryById(category);

        if (!categoryExist) {
            return res.status(400).json({ message: 'Category not found' });
        }

        if (imageUrl) {
            image = imageUrl;
        }

        let result = await productServices.createProduct(title, description, price, stock, category, image);

        if (result) {
            res.status(200).json({ message: 'Product created successfully' });
        } else {
            res.status(500).json({ message: 'Error creating product', error: result });
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params;
        const { title, description, price, stock, category, imageUrl } = req.body;
        let image = null;

        if (imageUrl) {
            image = imageUrl;
        }

        let categoryExist = await categoryServices.getCategoryById(category);

        if (!categoryExist) {
            return res.status(400).json({ message: 'Category not found' });
        }

        let result = await productServices.updateProduct(id, title, description, Number(price), Number(stock), category, image);

        if (result) {
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(500).json({ message: 'Error updating product' });
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const response = await productServices.deleteProduct(id);

        if (!response) {
            return res.status(500).json({ message: 'Error deleting product' });
        } else {
            return res.status(200).json({message: 'Product deleted successfully', response});
        }
    }

    async searchProducts(req, res) {
        let {column, value} = req.params;

        if(column == 'category') {
            const category = await categoryServices.getCategoryByName(value);
            // if (!category) {
            //     return res.status(500).json({ message: 'Category Not Found' });
            // }
            value = category ? category._id : value;
        }

        const response = await productServices.SearchProduct(column, value);
        if (!response) {
            return res.status(500).json({ message: 'Product Not Found' });
        } else {
            return res.status(200).json(response);
        }
        
    }
}

module.exports = new ProductController();