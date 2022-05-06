const {Router}  = require('express');
const userController = require("../controllers/user-controller")
const userMiddlewares = require("../middlewares/user.middleware")


const userRouter = Router();

userRouter.get('/', userController.getAllUser)

userRouter.post('/', userMiddlewares.checkIsEmailDuplicate, userMiddlewares.checkValidUserGender, userMiddlewares.checkAgeLimits, userController.createUser)

userRouter.get('/:userIndex', userMiddlewares.checkIsUserExist, userController.getUserById)

userRouter.delete('/:userIndex', userController.deleteUser)

module.exports = userRouter;
