module.exports = class StudentManager {
  constructor({ config, mongomodels, validators, managers }) {
    this.config = config;
    this.mongomodels = mongomodels;
    this.usersCollection = "student";
    this.validators = validators;
    this.classroomManager = managers.classroom;

    this.httpExposed = [
      "v1_createStudent",
      "get=v1_getStudents",
      "get=v1_getStudentById",
      "put=v1_updateStudent",
      "delete=v1_deleteStudent",
    ]; // exposed functions
  }

  async v1_createStudent({ __body, __longToken, __currentUser }) {
    const body = __body;
    const user = __currentUser;

    const result = await this.validators.student.createStudent(body);
    if (result) return result;
    const classroom = await this.classroomManager.checkClassroomAdmin({
      classroomId: body.classroom,
      userId: user.userId,
    });
    if (!classroom)
      return { error: "You are not authorized to create student" };

    const Student = this.mongomodels[this.usersCollection];
    const student = new Student(body);
    await student.save();
    return student;
  }

  async v1_getStudents({ __longToken }) {
    const Student = this.mongomodels[this.usersCollection];
    const students = await Student.find()
      .find()
      .populate({
        path: "classroom",
        select: "name",
        populate: { path: "school", select: "name" },
      });
    return students;
  }

  async v1_getStudentById({ __query, __longToken }) {
    const { id } = __query;
    const Student = this.mongomodels[this.usersCollection];
    const student = await Student.findById(id).populate({
      path: "classroom",
      select: "name",
      populate: { path: "school", select: "name" },
    });
    return student;
  }

  async v1_updateStudent({ __body, __query, __longToken, __currentUser }) {
    const body = __body;
    const { id } = __query;
    const user = __currentUser;

    const result = await this.validators.student.updateStudent(body);
    if (result) return result;

    const studentClassRoom = await this.getStudentClassRoom({ id });
    if (!studentClassRoom)
      return { error: "You are not authorized to update student" };

    const classroom = await this.classroomManager.checkClassroomAdmin({
      classroomId: studentClassRoom.classroom,
      userId: user.userId,
    });
    if (!classroom)
      return { error: "You are not authorized to update student" };

    const Student = this.mongomodels[this.usersCollection];
    const student = await Student.findByIdAndUpdate(id, body, {
      new: true,
    });
    return student;
  }

  async v1_deleteStudent({ __query, __longToken, __currentUser }) {
    const { id } = __query;
    const user = __currentUser;
    const studentClassRoom = await this.getStudentClassRoom({ id });
    if (!studentClassRoom)
      return { error: "You are not authorized to update student" };

    const classroom = await this.classroomManager.checkClassroomAdmin({
      classroomId: studentClassRoom.classroom,
      userId: user.userId,
    });
    if (!classroom)
      return { error: "You are not authorized to update student" };

    const Student = this.mongomodels[this.usersCollection];
    const student = await Student.findByIdAndDelete(id);
    return student;
  }

  async getStudentClassRoom({ id }) {
    const Student = this.mongomodels[this.usersCollection];
    const student = await Student.findById(id);
    return student;
  }
};
