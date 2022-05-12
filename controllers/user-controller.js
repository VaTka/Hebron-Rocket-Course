const User = require("../database/user.model");
const ApiError = require("../error/ApiError");

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      const {limit = 20, page = 1} = req.query
      const skip = (page - 1) * limit;

      const users = await User.find().limit(limit).skip(skip);
      const count = await User.count({});

      res.json({
        page,
        perPage: limit,
        data: users,
        count
      })
    } catch (e) {
      next(e);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const createdUser = await User.create(req.body)
      res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const {userIndex} = req.params;
      const user = req.user || await User.findById(userIndex);
      res.json(user);
    } catch (e) {
      next(e);
    }
  },
  deleteUser: (req, res, next) => {
    try {
      const {userIndex} = req.params;
      const users = User[userIndex];
      if (!users) {
        next(new ApiError('User not Found'), 404)
        return;
      }
    } catch (e) {
      next(e)
    }
  }
}
