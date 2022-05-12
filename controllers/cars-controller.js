const Car = require("../database/Car.model");
const ApiError = require("../error/ApiError");

module.exports = {
  getAllCar: async (req, res, next) => {
    try {
      const {limit = 20, page = 1} = req.query
      const skip = (page - 1) * limit;

      const cars = await Car.find().limit(limit).skip(skip);
      const count = await Car.count({});

      res.json({
        page,
        perPage: limit,
        data: cars,
        count
      })
    } catch (e) {
      next(e);
    }
  },

  createCar: async (req, res, next) => {
    try {
      const createdCar = await Car.create(req.body)
      res.status(201).json(createdCar);
    } catch (e) {
      next(e);
    }
  },
  getCarById: async (req, res, next) => {
    try {
      const {carsIndex} = req.params;
      const car = req.cars || await Car.findById(carsIndex);
      res.json(car);
    } catch (e) {
      next(e);
    }
  },
  deleteCar: (req, res, next) => {
    try {
      const {carIndex} = req.params;
      const cars = Car[carIndex];

      if (!cars) {
        next(new ApiError('Car not Found'), 404)
        return;
      }
    } catch (e) {
      next(e)
    }
  }
}
