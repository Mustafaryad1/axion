module.exports = class UserManger {
  constructor({
    utils,
    cache,
    config,
    cortex,
    managers,
    validators,
    mongomodels,
  } = {}) {
    this.config = config;
    this.cortex = cortex;
    this.validators = validators;
    this.mongomodels = mongomodels;
    this.tokenManager = managers.token;
    this.usersCollection = "user";
    this.httpExposed = ["v1_createUser"]; // exposed functions
  }

  async v1_createUser({ username, password, role }) {
    const user = { username, password, role };

    // Data validation
    let result = await this.validators.user.createUser(user);
    if (result) return result;

    // Creation Logic
    const User = this.mongomodels[this.usersCollection];
    const createdUser = new User(user);
    await createdUser.save();

    let longToken = this.tokenManager.genLongToken({
      userId: createdUser._id,
      userKey: createdUser.key,
    });

    // Response
    return {
      user: createdUser,
      longToken,
    };
  }
};
