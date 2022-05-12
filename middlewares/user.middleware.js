const User = require("../database/user.model.js");

const checkIsEmailDuplicate = async (req, res, next) => {
    try {
        const {email} = req.body;
        const isUserPresent = await User.findOne({email: email.toLowerCase().trim()});
        if (isUserPresent) {
            res.status(400)
                .json({
                    message: `User with ${email} already exist`
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

const checkIsUserExist = async (req, res, next) => {
    try {
        const {id} = req.body;
        const isUserPresent = await User.findOne({_id: id});
        if (!isUserPresent) {
            res.status(404)
                .json({
                    message: `User with this Id is not exist`
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

const checkValidUserGender = async (req, res, next) => {
    try {
        const {gender = "another"} = req.body;
        const Genders = ["male", "female", "another"];
        if (!Genders.includes(gender)){
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

const checkAgeLimits = async (req, res, next) => {
    try{

        const {age} = req.body;
        if (18 >= age) {
            res.status(404)
                .json({
                    message: ` Still a little boy, come back in ${18-age} years`
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

module.exports = {
    checkIsEmailDuplicate, checkIsUserExist, checkValidUserGender, checkAgeLimits
}