const router = require('express').Router();
const jwt = require('jsonwebtoken');
const UserProfile = require('../model/model.js').userProfile;
const helpers = require('../model/helpers.js');
// eslint-disable-next-line prefer-destructuring
const sendEmail = require('../model/email.js').sendEmail;

router.post('/signup', (request, response) => {
  if (!helpers.emailValidate(request.body.email)) {
    // console.log("There was error validating your email id");
    response.json({
      status: 400,
      message: 'There was error validating your email id',
    });
  } else {
    const profile = new UserProfile({
      NAME: request.body.name,
      EMAIL: request.body.email,
      DOB: request.body.dob,
      GENDER: request.body.gender,
      PASSWORD: helpers.hashAndReturn(request.body.password),
      EXPERIENCE: request.body.experience,
      DOMAIN: request.body.domain,
      // Image to be added by default according to gender.
    });
    profile.save((err) => {
      if (err) {
        if (err.code === 11000) {
          // console.log('The given email id is already registered with us', err);
          response.json({
            status: 400,
            message: 'The given email id is already registered with us',
          });
        } else {
          // console.log("There was some error saving the profile details", err)
          response.json({
            status: 500,
            message: 'There was some error signing you up :<',
          });
        }
      } else {
        // console.log('Profile saved in the database')
        response.send({
          status: 200,
          message: 'You were successfully signed up',
        });
      }
    });
  }
});


router.post('/login', (request, response) => {
  UserProfile.findOne({
    EMAIL: request.body.email,
  }, (err, data) => {
    if (err) {
      // console.log("There was error fetching the details", err)
      response.json({
        status: 500,
        message: 'There was error fetching the details',
      });
    } else if (data == null || data === undefined) {
      // console.log("No such user exist try signing up first")
      response.json({
        status: 400,
        message: 'No such user exist try signing up first',
      });
      return false;
    } else {
      if ((helpers.passwordAuth(data.PASSWORD, request.body.password))) {
        const payload = {
          email: request.body.email,
        };
        const token = jwt.sign(payload, process.env.SECRET);
        // console.log("Success, the password matched successfully");
        response.json({
          status: 200,
          token,
          message: 'Success, the password matched successfully',
          // while passing name capitalise the first letter of each word in name
          // Pass other required data
        });
        return true;
      }
      // console.log("The password didn't matched")
      response.json({
        status: 400,
        message: 'The password entered by the user was wrong',
      });
      return false;
    }
  });
});

router.post('/resetpassword', (request, response) => {
  const temp = helpers.passwordGenerator();
  UserProfile.findOne({
    EMAIL: request.body.email,
  }).then((resp) => {
    if (resp) {
      // if user found
      const email = sendEmail(request.body.email, 'Reset Password', `Hey there,\n\nAccording to the received request your new password is ${temp}\n\nThank You\nTeam Quadro`);
      if (email === 0) {
        response.json({
          // unable to send email
          status: 500,
          message: 'System was unable to send email to your registered email address, try resetting it later',
        });
      } else {
        UserProfile.findOneAndUpdate({
          EMAIL: request.body.email,
        },
        { $set: { PASSWORD: helpers.hashAndReturn(temp) } })
          .then((res) => {
            if (res) {
              response.json({
                status: 200,
                message: 'New password has been sent to your registered email-id',
              });
            }
          })
          .catch((err) => {
            response.json({
              status: 500,
              message: 'There was some server error while resetting your password',
            });
          });
      }
    } else {
      response.json({
        status: 400,
        message: 'No such user exist',
      });
    }
  })
    .catch(() => {
      response.json({
        status: 500,
        message: 'There was some error fetching user details',
      });
    });
});

module.exports = router;
