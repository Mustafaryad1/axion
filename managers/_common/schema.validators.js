const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  username: (data) => {
    if (data.trim().length < 3) {
      return false;
    }
    return true;
  },
  name: (data) => {
    if (data.trim().length < 3) {
      return false;
    }
    return true;
  },
  
};
