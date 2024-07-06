module.exports = class SchoolManager {
  constructor({ config, mongomodels }) {
    this.config = config;
    this.mongomodels = mongomodels;
    this.usersCollection = "school";
    this.httpExposed = [
      "v1_createSchool",
      "get=v1_getSchools",
      "get=v1_getSchoolById",
      "put=v1_updateSchool",
      "delete=v1_deleteSchool",
    ]; // exposed functions
  }

  async v1_createSchool({ __body }) {
    console.log(__body);
    const { name } = __body;
    const School = this.mongomodels[this.usersCollection];
    const school = new School({ name });
    await school.save();
    return school;
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

  async v1_updateSchool({ __body, __query }) {
    const { name } = __body;
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
