const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudentById,
  deleteStudentById,
} = require("../services/student.service");

// GET /student
router.get("/", getAllStudents);

// GET /student/:id
router.get("/:id", getStudentById);

// POST /student
router.post("/", createStudent);

// PUT /student/:id
router.put("/:id", updateStudentById);

// DELETE /student/:id
router.delete("/:id", deleteStudentById);

module.exports = router;
