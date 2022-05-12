const { Schema, model } = require('mongoose');
const carRolesEnum = require('../constants/car.roles.enum');

const Car = new Schema({
    name: {type: String, trim: true, required: true, default: "Kopeika"},
    vin: {type: String, trim: true, lowercase: true, unique: true, required: true},
    age: {type: Number, default: 1992},
    role: {type: String, enum: Object.values(carRolesEnum), default: carRolesEnum.SEDAN},
}, {timestamps: true});

module.exports = model("Car", Car);