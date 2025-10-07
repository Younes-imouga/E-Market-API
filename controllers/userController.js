const userServices = require('../services/userServices');

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
            res.status(500).json({ message: 'Error creating user' });
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
}

module.exports = new UserController();