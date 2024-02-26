
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const util = require("util");
const conn = require("../db/dbConnection");
const { body, validationResult } = require('express-validator');

// Login route
router.post("/login",
    body("name").isString(),
    body("password").isLength({ min: 8, max: 11 }).withMessage("Please enter a valid password (8-11 characters)"),
    async (req, res) => {
        try {
            // Validation of request parameters
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Check if the user exists in the database
            const query = util.promisify(conn.query).bind(conn);
            const user = await query("SELECT * FROM employee WHERE name = ?", [req.body.name]);

            if (user.length === 0) {
                return res.status(404).json({
                    errors: [{
                        msg: "User not found"
                    }],
                });
            }

           //i dont use bcrypt
            if (req.body.password === user[0].password) {
                // Passwords match
                return res.status(200).json(user);
            } else {
                // Passwords do not match
                return res.status(401).json({
                    errors: [{
                        msg: "Incorrect password"
                    }],
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
);


//get all students ==>gender male 
router.get("/maleStudents", async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);

    // Example query to retrieve male students
    const maleStudents = await query(`
    SELECT * FROM oldstudent WHERE gender = 'Male'
    UNION
    SELECT * FROM newstudent WHERE gender = 'Male'
   `);
    res.status(200).json(maleStudents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get all students gender ===> female 
router.get("/femaleStudents", async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);

    // Example query to retrieve male students
    const femaleStudents = await query(`
    SELECT * FROM oldstudent WHERE gender = 'Female'
    UNION
    SELECT * FROM newstudent WHERE gender = 'Female'
   `);
    res.status(200).json(femaleStudents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// function filter 
router.post("/filterstudents", async (req, res) => {
    try {
     // const { governorate_id, college_id, level_id, gpa_id } = req.body;
  
      const query = util.promisify(conn.query).bind(conn);
  
      // Example query to filter students
      // first filter for new students 
      const filteredStudent1 = await query(

        "SELECT * FROM newstudent WHERE  college_id IN (22,1,3,5) AND level_id IN ( 1,2) "
        
      );
      // Insert filtered students 1 into the new table with building_number
      for (const student of filteredStudent1) {
        let building_number;
  
        // Set building_number based on the student's gender
        if (student.gender === 'Male') {
          building_number = 1;
        } else if (student.gender === 'Female') {
          building_number = 2;
        } else {
          // Handle other gender values or set a default value
          building_number = null;
        }
  
      await query("INSERT INTO status1 SET ?", {
          student_id: student.id,
          name: student.name,
          national_id: student.nationalID,
          building_number: building_number,
        });
      }
      
      res.status(200).json({ msg: "Filtered students inserted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
   

  
module.exports = router;

