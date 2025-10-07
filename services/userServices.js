const User = require('../models/User');

class UserService {

    async CreateUser(name, email, password, res) {
        try {
          const user = new User(
            {
                name: name,
                email: email,
                password: password
            }
          );
          await user.save();
          return true;
        } catch (error) {
          return false;
        }
    }

    async getUsers() {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            return false;
        }
    }
}

module.exports = new UserService();