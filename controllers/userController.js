const userServices = require('../services/userServices');
const mongoose = require('mongoose');

class UserController {

    /**
     * @swagger
     * components:
     *   schemas:
     *     User:
     *       type: object
     *       properties:
     *         fullname:
     *           type: string
     *           description: The user's full name
     *         email:
     *           type: string
     *           description: The user's email address
     *         password:
     *           type: string
     *           description: The user's password
     *       required:
     *         - fullname
     *         - email
     *         - password
     */

     /**
     * @swagger
     * /users:
     *   post:
     *     summary: Create a new user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       200:
     *         description: User created successfully
     *       400:
     *         description: Email already exists or invalid input
     *       500:
     *         description: Server error
     */

    async createUser(req, res) {
        const { fullname, email, password } = req.body;

        let emailExist = await userServices.getUserByEmail(email);

        if (emailExist) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        let result = await userServices.CreateUser(fullname, email, password, res);

        if (result) {
            res.status(200).json({ message: 'User created successfully' });
        } else {
            res.status(500).json({ message: result });
        }
    }

     /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get all users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: List of all users
     *       500:
     *         description: Server error
     */

    async getUsers (req, res) {
        const response = await userServices.getUsers();
        if (!response) {
            return res.status(500).json({ message: 'Error getting users' });
        } else {
            return res.status(200).json(response);
        }
    }

     /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Get a user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID
     *     responses:
     *       200:
     *         description: User found
     *       400:
     *         description: Invalid ID format
     *       500:
     *         description: User not found or server error
     */

    async getUserByID (req, res) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const response = await userServices.getUserById(id);
        if (!response) {
            return res.status(500).json({ message: 'Error getting user' });
        } else {
            return res.status(200).json(response);
        }
    }

    
    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: Delete a user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID
     *     responses:
     *       200:
     *         description: User deleted successfully
     *       400:
     *         description: Invalid ID format
     *       500:
     *         description: Error deleting user
     */

    async deleteUser (req, res) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const response = await userServices.deleteUser(id);
        if (!response) {
            return res.status(500).json({ message: 'Error deleting user' });
        } else {
            return res.status(200).json(response);
        }
    }
}

module.exports = new UserController();