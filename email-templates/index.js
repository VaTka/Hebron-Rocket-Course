const {emailActionsEnum} = require('../constants')

module.exports = {
  [emailActionsEnum.WELCOME]: {
    subject: `You're alright, boy?`,
    templateName: 'welcome'
  }
};
