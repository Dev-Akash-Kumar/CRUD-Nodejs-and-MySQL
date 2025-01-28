const express = require("express");
const {
  getStudents,
  getStudentByID,
  createStudentRecord,
  updateStudentByID,
  deleteStudentByID,
} = require("../controllers/student");

// router object
const router = express.Router();

// routes

// GET all students list
router.get("/list", getStudents);

// GET student by id
router.get("/:id", getStudentByID);

// Create a new record
router.post("/create", createStudentRecord);

// Update record by id
router.post("/update/:id", updateStudentByID);

router.delete("/delete/:id", deleteStudentByID);

module.exports = router;
