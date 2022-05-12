const User = require("../database/Car.model.js");

const checkIsVINDuplicate = async (req, res, next) => {
    try {
        const {vin} = req.body;
        const isUserPresent = await User.findOne({vin: vin.trim()});
        if (isUserPresent) {
            res.status(400)
                .json({
                    message: `Car with ${vin} already exist`
                })
            return;
        }
        next();
    } catch (e) {
        res.status(400)
            .json({
                message: e.message
            })
    }
}

const checkIsCarExist = async (req, res, next) => {
    try {
        const {id} = req.body;
        const isUserPresent = await User.findOne({_id: id});
        if (!isUserPresent) {
            res.status(404)
                .json({
                    message: `Car with this Id is not exist`
                })
            return;
        }
        next();
    } catch (e) {
        res.status(400)
            .json({
                message: e.message
            })
    }
}

const checkAgeLimits = async (req, res, next) => {
    try {
        const {age} = req.body;
        if (1950 >= age) {
            res.status(400)
                .json({
                    message: `Ohh no, car is too old!`
                })
            return;
        }
        next();
    } catch (e) {
        res.status(400)
            .json({
                message: e.message
            })
    }
}

module.exports = {
    checkIsVINDuplicate, checkIsCarExist, checkAgeLimits
}