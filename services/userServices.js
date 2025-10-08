const User = require('../models/User');

class UserService {

    async CreateUser(fullname, email, password) {
        try {
          const user = new User(
            {
              fullname: fullname,
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
            const users = await User.find({ deleted: false });
            return users;
        } catch (error) {
            return false;
        }
    }

    async getUserById (id) {
      try {
        const user = await User.findOne({ _id: id, deleted: false });
        return user;
      } catch (error) {
        return false;
      }
    }

    async deleteUser (id) {
      try {
        const user = await User.findById(id);
        user.deleted = true;
        await user.save();
        
        return user;
      } catch (error) {
        return false;
      }
    }
}

module.exports = new UserService();