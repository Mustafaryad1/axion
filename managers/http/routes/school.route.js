const {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchoolById,
  deleteSchoolById,
} = require("../services/school.service");

const router = require("express").Router();

router.post("/", createSchool);
router.get("/", getAllSchools);
router.get("/:id", getSchoolById);
router.put("/:id", updateSchoolById);
router.delete("/:id", deleteSchoolById);

module.exports = router;
