const { Router } = require("express");

const {authController} = require("../controllers");
const {authMiddleware, userMiddleware} = require("../middlewares");
const {actionTypeEnum} = require("../constants");

const authRouter = Router();

authRouter.post("/login", authMiddleware.isLoginDataValid, userMiddleware.getUserDynamically('email'), authController.login);

authRouter.post('/logout', authMiddleware.checkAccessToken, authController.logout);

// eslint-disable-next-line max-len
authRouter.post('/password/forgot', authMiddleware.checkActionToken(actionTypeEnum.FORGOT_PASSWORD), authController.setPasswordAfterForgot)

module.exports = authRouter
