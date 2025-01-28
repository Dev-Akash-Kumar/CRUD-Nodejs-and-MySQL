const db = require("../config/db");

//GET all students list
const getStudents = async (req, res) => {
  try {
    const [studentData] = await db.query("SELECT * FROM students");
    if (!studentData) {
      return res.status(404).send({
        success: false,
        message: "No Records Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All Students Records",
      studentData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET all student list API",
      error,
    });
  }
};

// GET student by ID
const getStudentByID = async (req, res) => {
  try {
    const ID = req.params.id;
    if (!ID) {
      return res.status(404).send({
        success: false,
        message: "Invalid ID or Missing ID",
      });
    }
    /* SQL INJECTION RISK
      const [data] = await db.query(`SELECT * FROM students WHERE id`+ID);
    */
    const [data] = await db.query(`SELECT * FROM students WHERE id=?`, [ID]);
    if (!data || data.length == 0) {
      return res.status(404).send({
        success: false,
        message: "No Record Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Student By ID",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET student by ID API",
      error,
    });
  }
};

// CREATE a new record
const createStudentRecord = async (req, res) => {
  try {
    const { name, roll_no, class: className, fees, department } = req.body;
    if (!name || !roll_no || !className || !fees || !department) {
      return res.status(500).send({
        success: false,
        message: "Provide all fields",
      });
    }
    const [data] = await db.query(
      `INSERT INTO students (name, roll_no, class, fees, department) VALUES (?,?,?,?,?)`,
      [name, roll_no, className, fees, department]
    );
    if (!data || data.length == 0) {
      return res.status(404).send({
        success: false,
        message: "ERROR in INSER QUERY",
      });
    }
    res.status(200).send({
      success: true,
      message: "New Record Created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in POST student record API",
      error,
    });
  }
};

// UPDATE a record by ID
const updateStudentByID = async (req, res) => {
  try {
    const ID = req.params.id;
    if (!ID) {
      return res.status(404).send({
        success: false,
        message: "Missing or Invalid ID",
      });
    }
    const { name, roll_no, fees, class: className, department } = req.body;
    if (!name || !roll_no || !fees || !className || !department) {
      return res.status(404).send({
        success: false,
        message: "Missing fields",
      });
    }
    const updateData = await db.query(
      `UPDATE students SET name = ?, roll_no = ?, fees = ?,class = ?, department = ? WHERE id = ?`,
      [name, roll_no, fees, className, department, ID]
    );
    if (!updateData || updateData.length == 0) {
      return res.status(500).send({
        success: false,
        message: "Update failed",
      });
    }
    res.status(200).send({
      success: true,
      message: "Record Updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Update record API",
      error,
    });
  }
};

// DELETE a record by ID
const deleteStudentByID = async (req, res) => {
  try {
    const ID = req.params.id;
    if (!ID) {
      return res.status(404).send({
        success: false,
        message: "Missing or Invalid ID",
      });
    }

    const deleteData = await db.query(`DELETE FROM students WHERE id=?`, [ID]);
    if (!deleteData || deleteData.length == 0) {
      return res.status(500).send({
        success: false,
        message: "Delete Failed",
      });
    }
    res.status(200).send({
      success: true,
      message: "Record Deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Delete By ID API",
      error,
    });
  }
};

module.exports = {
  getStudents,
  getStudentByID,
  createStudentRecord,
  updateStudentByID,
  deleteStudentByID,
};
