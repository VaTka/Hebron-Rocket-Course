const usersDB = require("../database/users");

module.exports = {
    getAllUser: (req, res) => {
        res.json(usersDB)
    },
    createUser: (req, res) => {
        console.log(req.body);

        usersDB.push(req.body);
        res.json(usersDB);
    },
    getUserById: (req, res) => {
        console.log(req.params);
        const {userIndex} = req.params;
        const user = usersDB[userIndex]

        if (!user) {
            res.status(404).json('not found')
            return;
        }
        res.json(user)
    },
    deleteUser: (req, res) => {
        const {userIndex} = req.params;
        const users = usersDB[userIndex];

        if (!users) {
            res.status(404).json('not found')
            return;
        }
        res.send(users);
    }
}
