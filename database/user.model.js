const { Schema, model } = require('mongoose');
const {userRolesEnum, userGendersEnum} = require('../constants');

const User = new Schema({
  name: {type: String, trim: true, required: true, default: "Billy Bob"},
  email: {type: String, trim: true, lowercase: true, unique: true, required: true},
  age: {type: Number, default: 18},
  role: {type: String, enum: Object.values(userRolesEnum), default: userRolesEnum.USER},
  gender: {type: String, trim: true, lowercase: true, enum: Object.values(userGendersEnum), default: userGendersEnum.ANOTHER},
  password: { type: String, required: true, default: null, select: false}
}, {timestamps: true});

module.exports = model("User", User);
