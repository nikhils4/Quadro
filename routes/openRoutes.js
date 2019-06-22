const router = require('express').Router();

router.get('/', (request, response) => {
  response.json({
    status: 200,
    message: 'This is the home page',
  });
});

router.get('/about', (request, response) => {
  response.json({
    status: 200,
    message: 'This is the about route',
  });
});

router.get('/theteam', (request, response) => {
  response.json({
    status: 200,
    message: 'This is the team page',
  });
});

router.get('/signup', (request, response) => {
  response.json({
    status: 200,
    message: 'This is the signup page',
  });
});

router.get('/login', (request, response) => {
  response.json({
    status: 200,
    message: 'This is the login page',
  });
});

router.get('/logout', (request, response) => {
  response.clearCookie('sessionJWT');
  response.json({
    status: 200,
    message: 'User was successfully logged out',
  });
});

// router.get('/*', (request, response) => {
//   response.json({
//     status: 404,
//     message: 'Nothing found here',
//   });
// });

module.exports = router;
