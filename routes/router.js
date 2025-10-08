const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validator = require("../controllers/middlewares/validationMiddleware");
const {userSchema, productSchema} = require("../controllers/middlewares/schema");


router.get("/", (req, res) => {
    res.send("start");
});

// User Routes
router.get("/users/:id", userController.getUserByID);
router.get("/users", userController.getUsers);
router.post("/users", validator.validate(userSchema), userController.createUser);
router.delete("/users/:id", userController.deleteUser);

// Product Routes
router.get("/products", userController.getProducts);
router.get("/products/:id", userController.getProductByID);
router.post("/products", validator.validate(productSchema), userController.createProduct);
router.put("/products/:id", validator.validate(productSchema), userController.updateProduct);
router.delete("/products/:id", userController.deleteProduct);



module.exports = router;