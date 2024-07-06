module.exports = class StudentManager {
    constructor({ config, mongomodels }) {
        this.config = config;
        this.mongomodels = mongomodels;
        this.usersCollection = "student";
        this.httpExposed = [
            "v1_createStudent",
            "get=v1_getStudents",
            "get=v1_getStudentById",
            "put=v1_updateStudent",
            "delete=v1_deleteStudent",
        ]; // exposed functions
    }

    async v1_createStudent({ __body }) {
        console.log(__body);
        const Student = this.mongomodels[this.usersCollection];
        const student = new Student(body);
        await student.save();
        return student;
    }

    async v1_getStudents({}) {
        const Student = this.mongomodels[this.usersCollection];
        const students = await Student.find();
        return students;
    }

    async v1_getStudentById({ __query }) {
        const { id } = __query;
        const Student = this.mongomodels[this.usersCollection];
        const student = await Student.findById(id);
        return student;
    }

    async v1_updateStudent({ __body, __query }) {
        const body = __body;
        const { id } = __query;
        const Student = this.mongomodels[this.usersCollection];
        const student = await Student.findByIdAndUpdate(id, body, {
            new: true,
        });
        return student;
    }

    async v1_deleteStudent({ __query }) {
        const { id } = __query;
        const Student = this.mongomodels[this.usersCollection];
        const student = await Student.findByIdAndDelete(id);
        return student;
    }
};