const {Router} = require('express');
const carsController = require("../controllers/cars-controller")
const carMiddlewares = require("../middlewares/car.middleware")

const carsRouter = Router();

carsRouter.get('/', carsController.getAllCar)

// eslint-disable-next-line max-len
carsRouter.post('/',carMiddlewares.newCarValidator, carMiddlewares.checkAgeLimits, carMiddlewares.checkIsVINDuplicate, carsController.createCar)

carsRouter.all('/:carsIndex', carMiddlewares.checkIsCarExist)
carsRouter.get('/:carsIndex', carsController.getCarById)
carsRouter.get('/:carsIndex', carsController.deleteCar)

module.exports = carsRouter;
