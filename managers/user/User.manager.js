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
    this.httpExposed = ["v1_createUser", "v1_login"]; // exposed functions
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
      role: createdUser.role,
    });

    // Response
    return {
      user: { username, role: createdUser.role, _id: createdUser._id },
      longToken,
    };
  }

  async v1_login({ username, password }) {
    const user = { username, password };

    // Data validation
    let result = await this.validators.user.login(user);
    if (result) return result;

    // Login Logic
    const User = this.mongomodels[this.usersCollection];
    const foundUser = await User.findOne({ username });
    if (!foundUser) return { errors: ["User not found"] };

    const isPasswordValid = foundUser.password == password;
    if (!isPasswordValid) return { errors: ["Invalid password"] };

    let longToken = this.tokenManager.genLongToken({
      userId: foundUser._id,
      userKey: foundUser.key,
      role: foundUser.role,
    });

    // Response
    return {
      user: { username, role: foundUser.role, _id: foundUser._id },
      longToken,
    };
  }
};
