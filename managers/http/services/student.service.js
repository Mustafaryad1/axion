const Student = require("../../entities/student/student.mongoModel");
const ResponseDispatcher = require("../../response_dispatcher/ResponseDispatcher.manager");

const responseManager = new ResponseDispatcher();

// Create a new student
const createStudent = async (req, res) => {
  try {
    const studentData = req.body;
    const newStudent = new Student(studentData);
    const savedStudent = await newStudent.save();
    return responseManager.dispatch(res, {
      ok: true,
      data: savedStudent,
      code: 201,
    });
  } catch (error) {
    return responseManager.dispatch(res, {
      ok: false,
      data: null,
      errors: [error],
      message: error.message,
      code: 400,
    });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.aggregate([
      {
        $lookup: {
          from: "classrooms",
          localField: "classroom",
          foreignField: "_id",
          as: "classroom",
          pipeline: [
            {
              $lookup: {
                from: "schools",
                localField: "school",
                foreignField: "_id",
                as: "school",
                pipeline: [
                  {
                    $project: {
                      name: 1,

                      _id: 1,
                    },
                  },
                ],
              },
            },
            {
              $unwind: "$school",
            },
          ],
        },
      },
    ]);
    return responseManager.dispatch(res, {
      ok: true,
      data: students,
      code: 200,
    });
  } catch (error) {
    return responseManager.dispatch(res, {
      ok: false,
      data: null,
      errors: [error],
      message: error.message,
      code: 400,
    });
  }
};

// Get a student by ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate({
      path: "classroom",
      populate: { path: "school", select: "_id name" },
    });
    return responseManager.dispatch(res, {
      ok: true,
      data: student,
      code: 200,
    });
  } catch (error) {
    return responseManager.dispatch(res, {
      ok: false,
      data: null,
      errors: [error],
      message: error.message,
      code: 400,
    });
  }
};

// Update a student by ID
const updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const studentData = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(id, studentData, {
      new: true,
    });
    return responseManager.dispatch(res, {
      ok: true,
      data: updatedStudent,
      code: 200,
    });
  } catch (error) {
    return responseManager.dispatch(res, {
      ok: false,
      data: null,
      errors: [error],
      message: error.message,
      code: 400,
    });
  }
};

// Delete a student by ID
const deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    return responseManager.dispatch(res, {
      ok: true,
      data: null,
      code: 204,
    });
  } catch (error) {
    return responseManager.dispatch(res, {
      ok: false,
      data: null,
      errors: [error],
      message: error.message,
      code: 400,
    });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
