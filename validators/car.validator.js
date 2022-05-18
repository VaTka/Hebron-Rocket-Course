const Joi = require('joi')
// const {constants} = require("../constants");

const nexCarJoiSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(50).required(),
  vin: Joi.string().required().trim().lowercase(),
  age: Joi.number().integer().min(1800),
});
module.exports = {
  nexCarJoiSchema
}
