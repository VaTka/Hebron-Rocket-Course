const {authService, emailService} = require('../services')
const OAuth = require('../database/OAuth.model')

module.exports = {
  login: async (req, res, next) => {
    try {
      const {user, body: {password}} = req

      await emailService.sendMail()

      await authService.comperePasswords(user.password, password);

      const tokenPair = authService.generateTokenPair({userId: user._id})

      await OAuth.create({user_id: user._id, ...tokenPair});

      res.json({
        ...tokenPair,
        user
      })
    } catch (e) {
      next(e)
    }
  },

  logout: async (req, res, next) => {
    try {
      await OAuth.deleteMany({user_id: req.authUser._id})

    } catch (e) {
      next(e)
    }
  }
}
