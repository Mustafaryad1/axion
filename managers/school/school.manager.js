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

  async v1_createSchool({ __longToken, __isSuperAdmin, name, admins }) {
    const school = { name, admins };

    const result = await this.validators.school.createSchool(school);
    if (result) return result;

    const School = this.mongomodels[this.usersCollection];
    const createdSchool = new School(school);
    await createdSchool.save();
    return createdSchool;
  }

  async v1_getSchools({ __longToken }) {
    const School = this.mongomodels[this.usersCollection];
    const schools = await School.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "admins",
          foreignField: "_id",
          as: "admins",
          pipeline: [
            {
              $project: {
                _id: 1,
                username: 1,
              },
            },
          ],
        },
      },
    ]);
    return schools;
  }

  async v1_getSchoolById({ __query, __longToken }) {
    const { id } = __query;
    const School = this.mongomodels[this.usersCollection];
    const school = await School.findById(id).populate("admins", "_id username");
    return school;
  }

  async v1_updateSchool({ name, __query, __longToken, __isSuperAdmin }) {
    const result = await this.validators.school.updateSchool({ name });
    if (result) return result;

    const { id } = __query;
    const School = this.mongomodels[this.usersCollection];
    const school = await School.findByIdAndUpdate(id, { name }, { new: true });
    return school;
  }

  async v1_deleteSchool({ __query, __longToken, __isSuperAdmin }) {
    const { id } = __query;
    const School = this.mongomodels[this.usersCollection];
    const school = await School.findByIdAndDelete(id);
    return school;
  }
};
