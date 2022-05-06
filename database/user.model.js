const { Schema, model } = require('mongoose');
const userRolesEnum = require('../constants/user.roles.enum');
const userGendersEnum = require('../constants/user.gender.enum');

const User = new Schema({
    name: {type: String, trim: true, required: true, default: "Billy Bob"},
    email: {type: String, trim: true, lowercase: true, unique: true, required: true},
    age: {type: Number, default: 18},
    role: {type: String, enum: Object.values(userRolesEnum), default: userRolesEnum.USER},
    gender: {type: String, trim: true, lowercase: true, enum: Object.values(userGendersEnum), default: userGendersEnum.ANOTHER}
}, {timestamps: true});

module.exports = model("User", User);