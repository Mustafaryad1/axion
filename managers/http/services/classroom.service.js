const Classroom = require("../../entities/classroom/classroom.mongoModel");
const responseDispatcher = require("../../response_dispatcher/ResponseDispatcher.manager");

const responseManager = new responseDispatcher();

// Create a new classroom
const createClassroom = async (req, res) => {
  try {
    const classroomData = req.body;
    const newClassroom = new Classroom(classroomData);
    const savedClassroom = await newClassroom.save();
    return responseManager.dispatch(res, {
      ok: true,
      data: savedClassroom,
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

// Get all classrooms
const getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    return responseManager.dispatch(res, {
      ok: true,
      data: classrooms,
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

// Get a classroom by ID
const getClassroomById = async (req, res) => {
  try {
    const { id } = req.params;
    const classroom = await Classroom.findById(id);
    return responseManager.dispatch(res, {
      ok: true,
      data: classroom,
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

// Update a classroom by ID
const updateClassroomById = async (req, res) => {
  try {
    const { id } = req.params;
    const classroomData = req.body;
    const updatedClassroom = await Classroom.findByIdAndUpdate(
      id,
      classroomData,
      {
        new: true,
      }
    );
    return responseManager.dispatch(res, {
      ok: true,
      data: updatedClassroom,
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

// Delete a classroom by ID
const deleteClassroomById = async (req, res) => {
  try {
    const { id } = req.params;
    await Classroom.findByIdAndDelete(id);
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
  createClassroom,
  getAllClassrooms,
  getClassroomById,
  updateClassroomById,
  deleteClassroomById,
};
