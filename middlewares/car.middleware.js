const Car = require("../database/Car.model.js");
const ApiError = require("../error/ApiError");
const {carValidator} = require("../validators");

const checkIsVINDuplicate = async (req, res, next) => {
  try {
    const {vin} = req.body;
    const isUserPresent = await Car.findOne({vin: vin.trim()});
    if (isUserPresent) {
      next(new ApiError(`VIN with ${vin} is exist`, 409));
      return;
    }
    next();
  } catch (e) {
    next(e)
  }
}

const checkIsCarExist = async (req, res, next) => {
  try {
    const {carsIndex} = req.params;
    console.log(req.params)
    const isCarPresent = await Car.findById(carsIndex);
    if (!isCarPresent){
      next(new ApiError(`Car with Id: ${carsIndex} is not exist`, 404));
      return;
    }
    next();
  } catch (e) {
    next(e);
  }
}

// eslint-disable-next-line require-await
const checkAgeLimits = async (req, res, next) => {
  try {
    const {age} = req.body;
    if (age <= 1950) {
      next(new ApiError(`Ohh no, car is too old!`, 400));
      return;
    }
    next();
  } catch (e) {
    next(e);
  }
}

const newCarValidator = (req, res, next) => {
  try {
    const { error, value } = carValidator.nexCarJoiSchema.validate(req.body);
    if (error) {
      next(new ApiError(error.details[0].message, 400));
      return;
    }
    req.body = value;
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  checkIsVINDuplicate, checkIsCarExist, checkAgeLimits, newCarValidator
}
