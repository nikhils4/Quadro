var nodemailer = require('nodemailer');


module.exports.sendEmail = (receiver, subject, message) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PW
        }
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: receiver,
        subject: subject,
        text: message
    };


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return 0;
        } else {
            console.log('Email sent: ' + info.response);
            return 1
        }
    });

}



