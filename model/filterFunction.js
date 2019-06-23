const UserProfile = require('./model.js').userProfile;

exports.getFilteredData = (limit, sort, query) => new Promise((resolve, reject) => {
  UserProfile
    .find(query)
    .sort(sort)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
});
