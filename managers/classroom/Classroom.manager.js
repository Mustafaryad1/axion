module.exports = class ClassroomManager {
  constructor({ config, mongomodels }) {
    this.config = config;
    this.mongomodels = mongomodels;
    this.usersCollection = "classroom";
    this.httpExposed = [
      "v1_createClassroom",
      "get=v1_getClassrooms",
      "get=v1_getClassroomById",
      "put=v1_updateClassroom",
      "delete=v1_deleteClassroom",
    ]; // exposed functions
  }

  async v1_createClassroom({ __body }) {
    console.log(__body);
    const Classroom = this.mongomodels[this.usersCollection];
    const classroom = new Classroom(body);
    await classroom.save();
    return classroom;
  }

  async v1_getClassrooms({}) {
    const Classroom = this.mongomodels[this.usersCollection];
    const classrooms = await Classroom.find();
    return classrooms;
  }

  async v1_getClassroomById({ __query }) {
    const { id } = __query;
    const Classroom = this.mongomodels[this.usersCollection];
    const classroom = await Classroom.findById(id);
    return classroom;
  }

  async v1_updateClassroom({ __body, __query }) {
    const body = __body;
    const { id } = __query;
    const Classroom = this.mongomodels[this.usersCollection];
    const classroom = await Classroom.findByIdAndUpdate(id, body, {
      new: true,
    });
    return classroom;
  }

  async v1_deleteClassroom({ __query }) {
    const { id } = __query;
    const Classroom = this.mongomodels[this.usersCollection];
    const classroom = await Classroom.findByIdAndDelete(id);
    return classroom;
  }
};
