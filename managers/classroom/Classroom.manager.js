const { ObjectId } = require("mongoose").Types;

module.exports = class ClassroomManager {
  constructor({ config, mongomodels, validators, managers }) {
    this.config = config;
    this.mongomodels = mongomodels;
    this.validators = validators;
    this.schoolManager = managers.school;
    this.usersCollection = "classroom";
    this.httpExposed = [
      "v1_createClassroom",
      "get=v1_getClassrooms",
      "get=v1_getClassroomById",
      "put=v1_updateClassroom",
      "delete=v1_deleteClassroom",
    ]; // exposed functions
  }

  async v1_createClassroom({ __body, __longToken, __currentUser }) {
    const user = __currentUser;
    const body = __body;

    const result = await this.validators.classroom.createClassroom(body);
    if (result) return result;

    const school = await this.schoolManager.checkSchoolAdmin({
      schoolId: body.school,
      userId: user.userId,
    });
    if (!school) return { error: "You are not authorized to create classroom" };

    const Classroom = this.mongomodels[this.usersCollection];
    const classroom = new Classroom(body);
    await classroom.save();
    return classroom;
  }

  async v1_getClassrooms({ __longToken }) {
    const Classroom = this.mongomodels[this.usersCollection];
    const classrooms = await Classroom.find().populate({
      path: "school",
      select: "name",
    });
    return classrooms;
  }

  async v1_getClassroomById({ __query, __longToken }) {
    const { id } = __query;
    const Classroom = this.mongomodels[this.usersCollection];
    const classroom = await Classroom.findById(id).populate({
      path: "school",
      select: "name",
    });
    return classroom;
  }

  async v1_updateClassroom({ __longToken, __currentUser, __body, __query }) {
    const body = __body;
    const { id } = __query;
    const user = __currentUser;

    const result = await this.validators.classroom.updateClassroom(body);
    if (result) return result;

    const classroom = await this.checkClassroomAdmin({
      classroomId: id,
      userId: user.userId,
    });
    if (!classroom)
      return { errors: ["You are not authorized to update classroom"] };

    const Classroom = this.mongomodels[this.usersCollection];

    return Classroom.findByIdAndUpdate(id, body, { new: true });
  }

  async v1_deleteClassroom({ __query, __longToken, __currentUser }) {
    const { id } = __query;
    const user = __currentUser;
    const classroom = await this.checkClassroomAdmin({
      classroomId: id,
      userId: user.userId,
    });
    if (!classroom)
      return { errors: ["You are not authorized to update classroom"] };

    const Classroom = this.mongomodels[this.usersCollection];
    return Classroom.findByIdAndDelete(id);
  }

  async checkClassroomAdmin({ classroomId, userId }) {
    if (!ObjectId.isValid(classroomId) || !ObjectId.isValid(userId))
      return false;
    const Classroom = this.mongomodels[this.usersCollection];
    const classroom = await Classroom.findById(classroomId).populate("school");
    if (!classroom) return false;
    if (classroom.school?.admins.includes(userId)) return classroom;
    return false;
  }
};
