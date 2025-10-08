const Product = require('../models/Product');

class ProductService {

    async getProducts() {
        try {
            const products = await Product.find({ deleted: false });
            return products;
        } catch (error) {
            return false;
        }
    }

    async getProductById(id) {
        try {
            const product = await Product.findOne({ _id: id, deleted: false });
            return product;
        } catch (error) {
            return false;
        }
    }

    async createProduct(title, description, price, stock, category, imageUrl) {
        try {
            const product = new Product({
                title: title,
                description: description,
                price: price,
                stock: stock,
                category: category,
                imageUrl: imageUrl
            });
            await product.save();
            return true;
        } catch (error) {
            return false;
        }
    }

    async updateProduct(id, title, description, price, stock, category, imageUrl) {
        try {
            const product = await Product.findById(id);

            if (!product) return false;

            product.title = title;
            product.description = description;
            product.price = price;
            product.stock = stock;
            product.category = category;
            product.imageUrl = imageUrl;
            await product.save();
            
            return true;
        } catch (error) {
            return false;
        }
    }

    async deleteProduct(id) {
        try {
            const product = await Product.findById(id);
            product.deleted = true;
            await product.save();
            return product;
        } catch (error) {
            return false;
        }
    }

    async SearchProduct(column, value) {
        
        try {
            const product = await Product.find({ [column]: value, deleted: false });
            return product;
        } catch (error) {
            return false;
        }
    }
}

module.exports = new ProductService();