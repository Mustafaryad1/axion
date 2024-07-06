const School = require("../../entities/school/school.mongoModel");
const responseDispatcher = require("../../response_dispatcher/ResponseDispatcher.manager");
const responseManager = new responseDispatcher();

// Create a new school
const createSchool = async (req, res) => {
  try {
    const schoolData = req.body;
    const newSchool = new School(schoolData);
    const savedSchool = await newSchool.save();
    return responseManager.dispatch(res, {
      ok: true,
      data: savedSchool,
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

// Get all schools
const getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    return responseManager.dispatch(res, {
      ok: true,
      data: schools,
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

// Get a school by ID
const getSchoolById = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await School.findById(id);
    return responseManager.dispatch(res, {
      ok: true,
      data: school,
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

// Update a school by ID
const updateSchoolById = async (req, res) => {
  try {
    const { id } = req.params;
    const schoolData = req.body;
    const updatedSchool = await School.findByIdAndUpdate(id, schoolData, {
      new: true,
    });
    return responseManager.dispatch(res, {
      ok: true,
      data: updatedSchool,
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

// Delete a school by ID
const deleteSchoolById = async (req, res) => {
  try {
    const { id } = req.params;
    await School.findByIdAndDelete(id);
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
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchoolById,
  deleteSchoolById,
};
