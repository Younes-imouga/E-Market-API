const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validator = require("../controllers/middlewares/validationMiddleware");
const {userSchema, productSchema} = require("../controllers/middlewares/schema");
const productController = require("../controllers/productController");
const categoryController = require("../controllers/CategoryController");


router.get("/", (req, res) => {
    res.send("start");
});

// User Routes
router.get("/users/:id", userController.getUserByID);
router.get("/users", userController.getUsers);
router.post("/users", validator.validate(userSchema), userController.createUser);
router.delete("/users/:id", userController.deleteUser);

// Product Routes
router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductByID);
router.post("/products", validator.validate(productSchema), productController.createProduct);
router.put("/products/:id", validator.validate(productSchema), productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

// category routes
router.get("/categories", categoryController.getCategories);
router.get("/categories/:id", categoryController.getCategoryByID);
router.post("/categories", categoryController.createCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

module.exports = router;