const router = require('express').Router();
const UserProfile = require('../model/model.js').userProfile;
const helpers = require('../model/helpers.js');
// eslint-disable-next-line prefer-destructuring
const parser = require('../model/imageUpload.js').parser;


router.post('/name', (request, response) => {
  UserProfile.findOneAndUpdate({
    EMAIL: request.decode.email,
  },
  { $set: { NAME: request.body.name } })
    .then((res) => {
      if (res) {
        response.json({
          status: 200,
          message: 'Successfully updated the profile - name',
        });
      } else {
        response.json({
          status: 400,
          message: 'There was error authenticating the user',
        });
      }
    })
    .catch(() => {
      response.json({
        status: 500,
        message: 'There was some server error while updating your profile - name',
      });
    });
});

router.post('/password', (request, response) => {
  UserProfile.findOneAndUpdate({
    EMAIL: request.decode.email,
  },
  { $set: { PASSWORD: helpers.hashAndReturn(request.body.password) } })
    .then((res) => {
      if (res) {
        response.json({
          status: 200,
          message: 'Successfully updated the profile - password',
        });
      } else {
        response.json({
          status: 400,
          message: 'There was error authenticating the user',
        });
      }
    })
    .catch(() => {
      response.json({
        status: 500,
        message: 'There was some server error while updating your profile - password',
      });
    });
});

router.post('/experience', (request, response) => {
  UserProfile.findOneAndUpdate({
    EMAIL: request.decode.email,
  },
  { $set: { EXPERIENCE: request.body.experience } })
    .then((res) => {
      if (res) {
        response.json({
          status: 200,
          message: 'Successfully updated the profile - experience',
        });
      } else {
        response.json({
          status: 400,
          message: 'There was error authenticating the user',
        });
      }
    })
    .catch(() => {
      response.json({
        status: 500,
        message: 'There was some server error while updating your profile - experience',
      });
    });
});

router.post('/domain', (request, response) => {
  UserProfile.findOneAndUpdate({
    EMAIL: request.decode.email,
  },
  { $set: { DOMAIN: request.body.domain } })
    .then((res) => {
      if (res) {
        response.json({
          status: 200,
          message: 'Successfully updated the profile - domain',
        });
      } else {
        response.json({
          status: 400,
          message: 'There was error authenticating the user',
        });
      }
    })
    .catch(() => {
      response.json({
        status: 500,
        message: 'There was some server error while updating your profile - domain',
      });
    });
});

router.post('/description', (request, response) => {
  UserProfile.findOneAndUpdate({
    EMAIL: request.decode.email,
  },
  { $set: { DESCRIPTION: request.body.description } })
    .then((res) => {
      if (res) {
        response.json({
          status: 200,
          message: 'Successfully updated the profile - description',
        });
      } else {
        response.json({
          status: 400,
          message: 'There was error authenticating the user',
        });
      }
    })
    .catch(() => {
      response.json({
        status: 500,
        message: 'There was some server error while updating your profile - description',
      });
    });
});

// rating to be edit by some other user
router.post('/rating', (request, response) => {
  UserProfile.findOneAndUpdate({
    EMAIL: request.body.email,
  },
  { $inc: { RATING_COUNT: 1 } })
    .then((res) => {
      if (res) {
        return res;
      }
      response.json({
        status: 400,
        message: 'There was error validating the user profile',
      });
    })
    .then((res) => {
      UserProfile.findOneAndUpdate({
        EMAIL: request.body.email,
      },
      { $set: { TOTAL_RATING: request.body.rating + res.TOTAL_RATING } })
        .then((res) => {
          if (res) {
            return res;
          }
          response.json({
            status: 500,
            message: 'Error in updating the user rating',
            res,
          });
        })
        .then((res) => {
          UserProfile.findOneAndUpdate({
            EMAIL: request.body.email,
          },
          { $set: { RATING: (res.TOTAL_RATING / res.RATING_COUNT).toFixed(2) } })
            .then((res) => {
              response.json({
                status: 200,
                message: 'Rating successfully updated',
                res,
              });
            });
        })
        .catch((err) => {
          response.json({
            err,
            message: 'There was some error while updating rating',
          });
        });
    })
    .catch(() => {
      response.json({
        status: 500,
        message: 'There was some server error while updating user rating',
      });
    });
});

router.post('/description', (request, response) => {
  UserProfile.findOneAndUpdate({
    EMAIL: request.decode.email,
  },
  { $set: { DESCRIPTION: request.body.description } })
    .then((res) => {
      if (res) {
        response.json({
          status: 200,
          message: 'Successfully updated the profile - description',
        });
      } else {
        response.json({
          status: 400,
          message: 'There was error authenticating the user',
        });
      }
    })
    .catch(() => {
      response.json({
        status: 500,
        message: 'There was some server error while updating your profile - description',
      });
    });
});

router.post('/availability', (request, response) => {
  UserProfile.findOneAndUpdate({
    EMAIL: request.decode.email,
  },
  { $set: { AVAILABLE: request.body.available } })
    .then((res) => {
      if (res) {
        response.json({
          status: 200,
          message: 'Successfully updated the profile - availability',
        });
      } else {
        response.json({
          status: 400,
          message: 'There was error authenticating the user',
        });
      }
    })
    .catch(() => {
      response.json({
        status: 500,
        message: 'There was some server error while updating your profile - availability',
      });
    });
});

router.post('/avatar', parser.single('image'), (request, response) => {
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

module.exports = router;
