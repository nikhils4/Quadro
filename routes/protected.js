const router = require('express').Router();
// eslint-disable-next-line prefer-destructuring
const parser = require('../model/imageUpload.js').parser;
const UserProfile = require('../model/model.js').userProfile;
const GetFilteredData = require('../model/filterFunction').getFilteredData;
// eslint-disable-next-line prefer-destructuring
const sendEmail = require('../model/email.js').sendEmail;

router.post('/imageUpload', parser.single('image'), (request, response) => {
  // let email = request.decode.email;
  UserProfile.findOneAndUpdate({
    EMAIL: request.decode.email,
  },
  { $set: { IMAGE_URL: request.file.url, IMAGE_ID: request.file.public_id } },
  { new: true })
    .then((result) => {
      if (result) {
        response.json({
          status: 200,
          message: 'Profile pic was successfully updated',
          image_url: request.file.url,
        });
      } else {
        response.json({
          status: 400,
          message: 'There was authentication error while updating the profile pic',
        });
      }
    })
    .catch(() => {
      response.json({
        status: 500,
        message: 'There was some server error while updating profile pic',
      });
    });
});

router.get('/filterdata', (request, response) => {
  let {
    limit,
    // eslint-disable-next-line prefer-const
    sort,
    query,
  } = request.query;
  query = JSON.parse(query);
  // eslint-disable-next-line radix
  limit = parseInt(limit);
  GetFilteredData(limit, sort, query)
    .then((data) => {
      response.json({
        status: 200,
        data,
      });
    })
    .catch((err) => {
      response.json({
        status: 500,
        message: 'There was error filtering data',
        error: err,
      });
    });
});

router.post('/connect', async (request, response) => {
  const email = await sendEmail(request.body.email, 'Work Request', `Hey there,\n\nYou have received a request from ${request.decode.email}.\nHead over to your Quadro account to know and connect.\n\nHappy working!!\n\nThank You\nTeam Quadro`);
  if (email === 0) {
    response.json({
      status: 500,
      message: 'There was some error send request - email error',
    });
    return false;
  }
  UserProfile.update({
    EMAIL: request.decode.email,
  },
  { $push: { REQUEST_SENT: request.body.email } })
    .then((res) => {
      return res;
    })
    .then((res) => {
      UserProfile.update({
        EMAIL: request.body.email,
      },
      { $push: { REQUEST_RECEIVED: request.decode.email } })
        .then((res) => {
          response.json({
            status: 200,
            message: 'Successfully sent request',
          });
        })
        .catch((err) => {
          response.json({
            status: 500,
            message: 'There was server error while sending request',
            err,
          });
        });
    })
    .catch((err) => {
      response.json({
        status: 500,
        message: 'There was some error while sending request',
      });
    });
});

module.exports = router;
