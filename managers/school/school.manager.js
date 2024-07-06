const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class SchoolManager {
  constructor({ config, mongomodels, validators }) {
    this.config = config;
    this.mongomodels = mongomodels;
    this.validators = validators;
    this.usersCollection = "school";
    this.httpExposed = [
      "v1_createSchool",
      "get=v1_getSchools",
      "get=v1_getSchoolById",
      "put=v1_updateSchool",
      "delete=v1_deleteSchool",
    ]; // exposed functions
  }

  async v1_createSchool({ name, admins }) {
    const school = { name, admins };

    const result = await this.validators.school.createSchool(school);
    if (result) return result;

    const School = this.mongomodels[this.usersCollection];
    const createdSchool = new School(school);
    await createdSchool.save();
    return createdSchool;
  }

  async v1_getSchools({}) {
    const School = this.mongomodels[this.usersCollection];
    const schools = await School.find();
    return schools;
  }

  async v1_getSchoolById({ __query }) {
    const { id } = __query;
    const School = this.mongomodels[this.usersCollection];
    const school = await School.findById(id);
    return school;
  }

  async v1_updateSchool({ name, __query }) {
    const result = await this.validators.school.updateSchool({ name });
    if (result) return result;

    const { id } = __query;
    const School = this.mongomodels[this.usersCollection];
    const school = await School.findByIdAndUpdate(id, { name }, { new: true });
    return school;
  }

  async v1_deleteSchool({ __query }) {
    const { id } = __query;
    const School = this.mongomodels[this.usersCollection];
    const school = await School.findByIdAndDelete(id);
    return school;
  }
};
