const User = require("../database/user.model");

module.exports = {
    getAllUser: async (req, res) => {
        const users = await User.find();
        res.json(users)
    },
    createUser: async (req, res) => {
        try {
            const createdUser = await User.create(req.body)
            res.status(201).json(createdUser);
        } catch (e) {
            res.status(400)
                .json({
                    message: e.message
                })
        }
    },
    getUserById: async (req, res) => {
        try {
            const {userIndex} = req.params;
            const user = await User.findById(userIndex);
            if (!user) {
                res.status(404).json('not found')
                return;
            }
        } catch (e) {
            res.status(400)
                .json({
                    message: e.message
                })
        }
    },
    deleteUser: (req, res) => {
        try {
            const {userIndex} = req.params;
            const users = User[userIndex];

            if (!users) {
                res.status(404).json('not found')
                return;
            }
        } catch (e) {
            res.status(400)
                .json({
                    message: e.message
                })
        }

    }
}
