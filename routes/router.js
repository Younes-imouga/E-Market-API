const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validationMiddleware = require("../controllers/middlewares/validationMiddleware");
const {userSchema} = require("../controllers/middlewares/schema");
const validator = new validationMiddleware();

router.get("/", (req, res) => {
    res.send("start");
})
// User Routes
router.get("/users", userController.getUsers);

// express validator
// router.post("/users", validator.validateUser, userController.createUser);

// Yup validator
router.post("/users", validator.validate(userSchema), userController.createUser);

module.exports = router;