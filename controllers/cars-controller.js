const Car = require("../database/Car.model");

module.exports = {
    getAllCar: async (req, res) => {
        const cars = await Car.find();
        res.json(cars)
    },
    createCar: async (req, res) => {
        try {
            const createdCar = await Car.create(req.body)
            res.status(201).json(createdCar);
        } catch (e) {
            res.status(400)
                .json({
                    message: e.message
                })
        }
    },
    getCarById: async (req, res) => {
        try {
            const {carIndex} = req.params;
            const car = await Car.findById(carIndex);
            if (!car) {
                res.status(404).json('not found')
                return;
            }
        } catch (e) {
            res.status(400)
                .json({
                    message: e.message
                })
        }
    },
    deleteCar: (req, res) => {
        try {
            const {carIndex} = req.params;
            const cars = Car[carIndex];

            if (!cars) {
                res.status(404).json('not found')
                return;
            }
        } catch (e) {
            res.status(400)
                .json({
                    message: e.message
                })
        }

    }
}