const User = require("../database/user.model.js");
const ApiError = require("../error/ApiError");
const {userValidator} = require("../validators");

const checkIsEmailDuplicate = async (req, res, next) => {
  try {
    const {email} = req.body;
    if (!email) {
      next(new ApiError('Email is required', 400));
      return;
    }
    const isUserPresent = await User.findOne({email: email.toLowerCase().trim()});
    if (isUserPresent) {
      next(new ApiError(`Email with ${email} is exist`, 409));
      return;
    }
    next();
  } catch (e) {
    next(e)
  }
}

const checkIsUserExist = async (req, res, next) => {
  try {
    const {userIndex} = req.params;
    const isUserPresent = await User.findById(userIndex);
    if (!isUserPresent){
      next(new ApiError(`User with Id: ${userIndex} is not exist`, 404));
      return;
    }
    next();
  } catch (e) {
    next(e);
  }
}

// eslint-disable-next-line require-await
const checkValidUserGender = async (req, res, next) => {
  try {
    const {gender = "another"} = req.body;
    const Genders = [
      "male",
      "female",
      "another"
    ];
    if (!Genders.includes(gender)) {
      res.status(404)
        .json({
          message: `No such gender like ${gender}`
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

// eslint-disable-next-line require-await
const checkAgeLimits = async (req, res, next) => {
  try {

    const {age} = req.body;
    if (age <= 18) {
      next(new ApiError(`Still a little boy, come back in ${18 - age} years`, 400));
      return;
    }
    next();
  } catch (e) {
    next(e);
  }
}

const newUserValidator = (req, res, next) => {
  try {
    const { error, value } = userValidator.nexUserJoiSchema.validate(req.body);
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
  checkIsEmailDuplicate, checkIsUserExist, checkValidUserGender, checkAgeLimits, newUserValidator
}
