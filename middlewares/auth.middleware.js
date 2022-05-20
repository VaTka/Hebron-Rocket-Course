const {authService} = require('../services')
const { authValidator} = require('../validators')
const ApiError = require('../error/ApiError')

function checkAccessToken(req, res, next) {
  try {
    const token = 'sgrwrhrgsjgmsrlTOKEN';
    authService.validateToken(token)
    next();
  }catch (e) {
    next(e)
  }
}

function checkRefreshToken(req, res, next) {
  try {
    const token = 'sdfsfdsfdfTOKEN';
    authService.validateToken(token, 'refresh')
    next();
  }catch (e) {
    next(e)
  }
}

function isLoginDataValid(req, res, next) {
  try {
    const {value, error} = authValidator.loginSchema.validate(req.body);
    if (error) {
      next(new ApiError(error.details[0].message));
      return;
    }
    req.body = value;
  }catch (e){
    next(e)
  }
}

module.exports = {
  checkAccessToken,
  checkRefreshToken,
  isLoginDataValid
}
