const Joi = require('joi')
const {constants} = require("../constants");

const nexUserJoiSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(50).required(),
  email: Joi.string().regex(constants.EMAIL_REGEXP).required().trim().lowercase(),
  age: Joi.number().integer().min(18),
  password: Joi.string().required()
});
module.exports = {
  nexUserJoiSchema
}
