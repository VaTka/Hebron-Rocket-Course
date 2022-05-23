const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require('../config/config')
const { tokenTypeEnum } = require('../constants')

async function comperePasswords(hashPassword, password) {
  const isPasswordSame = await bcrypt.compare(password, hashPassword)

  if (!isPasswordSame) {
    throw new ApiError('Wrong password', 400)
  }
}

const hashPassword = password => bcrypt.hash(password, 10);

function generateTokenPair(encodeData) {
  const access_token = jwt.sign(encodeData, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
  const refresh_token = jwt.sign(encodeData, REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

  return {
    access_token,
    refresh_token
  }
}

const validateToken = (token, tokenType = tokenTypeEnum.ACCESS) => {
  try {
    let secretWord = ACCESS_TOKEN_SECRET;

    if (tokenType === tokenTypeEnum.REFRESH) {
      secretWord = REFRESH_TOKEN_SECRET;
    }
    console.log(token, secretWord)
    return jwt.verify(token, secretWord);
  } catch (e) {
    throw new ApiError(e.message || 'Invalid token', 401);
  }
};

module.exports = {
  comperePasswords,
  hashPassword,
  generateTokenPair,
  validateToken
}
