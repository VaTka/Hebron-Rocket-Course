const {authService} = require('../services')

module.exports = {
  login: async (req, res, next) => {
    try {
      const {user, body: {password}} = req
      await authService.comperePasswords(user.password, password);
      const tokenPair = authService.generateTokenPair({userId: user._id})
      res.json({
        ...tokenPair,
        user
      })
    } catch (e) {
      next(e)
    }
  }
}
