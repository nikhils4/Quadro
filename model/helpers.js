const bcrypt = require("bcrypt")

module.exports.hashAndReturn = (password) => {
    let hash = bcrypt.hashSync(password, Number(process.env.SALT));
    return hash
}

module.exports.emailValidate = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
