const { Router } = require("express");

const {authController} = require("../controllers");
const {authModdleware, userModdleware} = require("../middlewares");
const reportRouter = Router();
reportRouter.post("/login",authModdleware.isLoginDataValid, userModdleware.getUserDynamically('email'), authController.login);

module.exports = reportRouter