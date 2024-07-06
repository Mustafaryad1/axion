const express = require("express");
const {
  getAllClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroomById,
  deleteClassroomById,
} = require("../services/classroom.service");

const router = express.Router();

// GET /classroom
router.get("/", getAllClassrooms);

// GET /classroom/:id
router.get("/:id", getClassroomById);

// POST /classroom
router.post("/", createClassroom);

// PUT /classroom/:id
router.put("/:id", updateClassroomById);

// DELETE /classroom/:id
router.delete("/:id", deleteClassroomById);

module.exports = router;
