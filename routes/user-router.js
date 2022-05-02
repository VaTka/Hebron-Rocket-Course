const {Router}  = require('express');
const userController = require("../controllers/user-controller")


const userRouter = Router();

userRouter.get('/', userController.getAllUser)

userRouter.post('/', userController.createUser)

userRouter.get('/:userIndex', userController.getUserById)

userRouter.delete('/:userIndex', userController.deleteUser)

module.exports = userRouter;
