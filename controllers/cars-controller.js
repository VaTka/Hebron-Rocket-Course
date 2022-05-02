const carsDB = require("../database/cars");

module.exports = {
    getAllCars: (req, res) => {
        res.json(carsDB)
    },
    createUser: (req, res) => {
        console.log(req.body);

        carsDB.push(req.body);
        res.json(carsDB);
    },
    getCarsById: (req, res) => {
        console.log(req.params);
        const {carsIndex} = req.params;
        const car = carsDB[carsIndex]

        if (!car) {
            res.status(404).json('not found')
            return;
        }
        res.json(car)
    },
    deleteCars: (req, res) => {
        const {carsIndex} = req.params;
        const car = carsDB[carsIndex];

        if (!car) {
            res.status(404).json('not found')
            return;
        }
        res.send(car);
    }
}