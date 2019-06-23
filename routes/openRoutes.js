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

router.get('/domains', (request, response) => {
  response.json({
    status: 200,
    data: ['Android Development', 'Artificial Intelligence', 'Cyber Security', 'Designer', 'iOS Developement', 'Machine Learning', 'Web Developemnt'],
  });
});

module.exports = router;
