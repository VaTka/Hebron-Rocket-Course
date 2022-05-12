const {Router} = require('express');
const userController = require("../controllers/user-controller")
const userMiddlewares = require("../middlewares/user.middleware")


const userRouter = Router();

userRouter.get('/', userController.getAllUser)
// eslint-disable-next-line max-len
userRouter.post('/', userMiddlewares.checkIsEmailDuplicate, userMiddlewares.checkValidUserGender, userMiddlewares.checkAgeLimits, userController.createUser)

userRouter.all('/:userIndex', userMiddlewares.checkIsUserExist)
userRouter.get('/:userIndex', userController.getUserById)
userRouter.delete('/:userIndex', userController.deleteUser)

module.exports = userRouter;
