const bcrypt = require('bcrypt');
const ApiError = require('../error/ApiError')

async function compereVin(hashPassword, vin) {
  const isVinSame = await bcrypt.compare(vin, hashPassword)

  if (!isVinSame){
    throw new ApiError('Wrong VIN', 400)
  }
}

function hashVin(vin) {
  return bcrypt.hash(vin, 10)
}

module.exports= {
  compereVin,
  hashVin
}
