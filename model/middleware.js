const jwt = require('jsonwebtoken');

module.exports.session = (request, response, next) => {
  const token = request.cookies.sessionJWT;
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decode) => {
      if (error) {
        response.send({
          status: 400,
          message: 'Authentication failed (unable to authenticate access token)',
        });
      } else {
        request.decode = decode;
        next();
      }
    });
  } else {
    next();
  }
};
