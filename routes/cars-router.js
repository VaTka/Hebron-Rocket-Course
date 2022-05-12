const {Router}  = require('express');
const carsController = require("../controllers/cars-controller")
const userMiddlewares = require("../middlewares/car.middleware")

const carsRouter = Router();

carsRouter.get('/', carsController.getAllCar)

carsRouter.post('/', userMiddlewares.checkAgeLimits, userMiddlewares.checkIsVINDuplicate, carsController.createCar)

carsRouter.get('/:carsIndex', userMiddlewares.checkIsCarExist, carsController.getCarById)

carsRouter.get('/:carsIndex', carsController.deleteCar)

module.exports = carsRouter;
