const bcrypt = require("bcrypt")

module.exports.hashAndReturn = (password) => {
    let hash = bcrypt.hashSync(password, Number(process.env.SALT));
    return hash
}
