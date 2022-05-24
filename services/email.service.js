const nodemailer = require('nodemailer')
const { SYSTEM_MAIL, SYSTEM_MAIL_PASSWORD } = require('../config/config')

const sendMail = async () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SYSTEM_MAIL,
      pass: SYSTEM_MAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: SYSTEM_MAIL,
    to: 'mrbananastv@gmail.com',
    subject: 'Welcome!',
    html: `<div style="background-color: pink">Welcome to the Club, body</div>`
  })
}

module.exports = {
  sendMail
}
