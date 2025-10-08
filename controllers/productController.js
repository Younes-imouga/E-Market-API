const { number } = require('yup');
const productServices = require('../services/productServices');
const categoryServices = require('../services/categoryServices');
const mongoose = require('mongoose');

class ProductController {

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

        let result = await productServices.updateProduct(id, title, description, number(price), number(stock), category, image);

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
}

module.exports = new ProductController();