const {emailActionsEnum} = require('../constants')

module.exports = {
  [emailActionsEnum.WELCOME]: {
    subject: `You're alright, boy?`,
    templateName: 'welcome'
  },

  [emailActionsEnum.FORGOT_PASSWORD]: {
    subject: `You are forgot Password`,
    templateName: 'forgotPassword'
  }
};
