const {Router}  = require('express');
const carsController = require("../controllers/cars-controller")

const carsRouter = Router();

carsRouter.get('/', carsController.getAllCars)

carsRouter.post('/', carsController.createUser)

carsRouter.get('/:carsIndex', carsController.getCarsById)

carsRouter.get('/:carsIndex', carsController.deleteCars)

module.exports = carsRouter;
