const bcrypt = require('bcrypt');

module.exports.hashAndReturn = (password) => {
  const hash = bcrypt.hashSync(password, Number(process.env.SALT));
  return hash;
};

module.exports.emailValidate = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

module.exports.passwordAuth = (dbPassword, inputPassword) => {
  if (bcrypt.compareSync(inputPassword, dbPassword)) {
    // console.log('Success, passord matched');
    return true;
  }
  // console.log("Failed, the password didn't matched");
  return false;
};

module.exports.passwordGenerator = () => {
  let text = '';
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 8; i += 1) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return text;
};
