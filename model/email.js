const nodemailer = require('nodemailer');

module.exports.sendEmail = (receiver, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PW,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: receiver,
    subject,
    text: message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // console.log(error);
      return 0;
    }
    // console.log('Email sent: ' + info.response);
    return 1;
  });
};
