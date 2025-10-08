const userServices = require('../services/userServices');
const mongoose = require('mongoose');

class UserController {

    async createUser(req, res) {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        let result = await userServices.CreateUser(fullname, email, password, res);

        if (result) {
            res.status(200).json({ message: 'User created successfully' });
        } else {
            res.status(500).json({ message: result });
        }
    }

    async getUsers (req, res) {
        const response = await userServices.getUsers();
        if (!response) {
            return res.status(500).json({ message: 'Error getting users' });
        } else {
            return res.status(200).json(response);
        }
    }

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