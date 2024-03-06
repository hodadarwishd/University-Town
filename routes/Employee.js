
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
// add building
router.post("/addbuilding",
    body("number").isInt(),
    body('gender').isIn(['Male', 'Female']),
    body("number_of_rooms").isInt(),
    body("number_of_floors").isInt(),
    body("admin_id").isInt(),

    async (req, res) => {
        try {
            // Validation request [manual, express validation]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }

            // Log received building number
            console.log("Received building number:", req.body.number);

            // Clean the building number by trimming leading/trailing whitespaces
            const cleanedBuildingNumber = req.body.number.trim();

            // Check if the building already exists
            const query = util.promisify(conn.query).bind(conn);
            const checkbuildingExist = await query("SELECT * FROM buildings WHERE number=?", [cleanedBuildingNumber]);

            // Log existing buildings
            console.log("Existing buildings:", checkbuildingExist);

            if (checkbuildingExist.length > 0) {
                res.status(400).json({
                    errors: [{
                        msg: "Building is already exist"
                    }],
                });
                return; // Exit the function to avoid further execution
            }

            // Prepare object building
            const buildings = {
                number: cleanedBuildingNumber,
                gender: req.body.gender,
                number_of_rooms: req.body.number_of_rooms,
                number_of_floors: req.body.number_of_floors,
                admin_id: req.body.admin_id
            };

            // Insert object into the database
            await query("INSERT INTO buildings SET ?", buildings);
            res.status(200).json(buildings);

        } catch (err) {
            console.log(err);
            res.status(500).json({ err: err.message || 'Internal Server Error' });
        }
    }
);

 //update building 
 router.put("/updatebuilding/:id",
 body("number").isInt(),
body('gender').isIn(['Male', 'Female']),
body("number_of_rooms").isInt(),
body("number_of_floors").isInt(),
body("admin_id").isInt(),

 async (req, res) => {
     try {
       // validation request [manual, express validation]
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }
 
       const query = util.promisify(conn.query).bind(conn);
       const user = await query("select * from buildings where id = ?", [req.params.id]);
       if (!user[0]) {
         return res.status(404).json({
           msg: "building id not exist",
         });
       }
       
       // prepare object user
       const buildings={
        number: req.body.number,
        gender:req.body.gender,
        number_of_rooms:req.body.number_of_rooms,
        number_of_floors:req.body.number_of_floors,
        admin_id:req.body.admin_id
     
      }
      
       // update student in the database
       await query("update buildings set ? where id=?", [buildings, req.params.id]);
 
       res.status(200).json({
         msg: "building updated successfully",
       });
     } catch (err) {
       console.log(err);
       res.status(500).json(err);
     }
   });

   // delete building 
   router.delete("/deletebuilding/:id", async (req, res) => {
    try {
        // validation request [manual,express validation ]
        const query = util.promisify(conn.query).bind(conn);

        // check if employee exists or not 
        const building = await query("select * from buildings where id = ?", [req.params.id]);

        if (!building[0]) {
            res.status(404).json({
                msg: "building id not exist"
            });
        }

        // delete employee in database 
        await query("delete from buildings where id = ?", [building[0].id]);

        res.status(200).json({
            msg: "building deleted successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//get total number of students 

// function new student filter special need 

router.post('/filterAndInsertStudents1', async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);

    // Filter students based on SpecialNeed condition
    const filteredStudents = await query(`
      SELECT * FROM newstudent
      WHERE SpecialNeed = true
    `);

    // Insert filtered students into the "status1" table
    const insertedStudents = [];
    const errors = [];

    for (const student of filteredStudents) {
      let building_number;
      let collegeId;
      let collegeName; // Added variable to store college name

      // Retrieve college_id for the current student
      const collegeResult = await query(`
        SELECT college_id FROM newstudent
        WHERE id = ?
      `, [student.id]);

      // Check if collegeResult is not empty
      if (collegeResult.length > 0) {
        collegeId = collegeResult[0].college_id;

        // Fetch college name based on college_id
        const collegeNameResult = await query(`
          SELECT name FROM college WHERE id = ?
        `, [collegeId]);

        if (collegeNameResult.length > 0) {
          collegeName = collegeNameResult[0].name;
        } else {
          collegeName = 'Unknown College'; // Set a default value if college name is not found
        }

        // Determine building_number based on college_id and gender
        if (collegeId === 1 || collegeId === 22 || collegeId === 3 || collegeId === 5) {
          // College 1 logic
          building_number = student.gender === 'Male' ? 1 : 2;
        } else if (collegeId === 7 || collegeId === 4 || collegeId === 6 || collegeId === 10 || collegeId === 11 || collegeId === 16) {
          // College 2 logic
          building_number = student.gender === 'Male' ? 3 : 12;
        } else if (collegeId === 21 || collegeId === 18 || collegeId === 19 || collegeId === 20 || collegeId === 23) {
          // College 3 logic
          building_number = student.gender === 'Male' ? 5 : 4;
        } else if (collegeId === 8 || collegeId === 9 || collegeId === 12 || collegeId === 13 || collegeId === 14 || collegeId === 15 || collegeId === 17) {
          // College 4 logic
          building_number = student.gender === 'Male' ? 9 : 18;
        } else {
          // Handle other collegeId values or set a default value
          building_number = null; // Change this to your default value
        }

        // Check if the student already exists in status1
        const existingStudent = await query(`
          SELECT * FROM status1 WHERE national_id = ?
        `, [student.nationalID]);

        if (existingStudent.length === 0) {
          // National ID doesn't exist, proceed with insertion
          const insertResult = await query(`
            INSERT INTO status1 (name, national_id, building_number,  college_name)
            VALUES (?, ?, ?,  ?)
          `, [student.name, student.nationalID, building_number,  collegeName]);

          insertedStudents.push({
            name: student.name,
            nationalID: student.nationalID,
            building_number: building_number,
            college_name: collegeName,
          });
        } else {
          // National ID already exists, collect the error
          errors.push(`Student with national ID ${student.nationalID} already filtered`);
        }
      } else {
        // Handle the case when collegeResult is empty
        errors.push(`College information not found for student with ID ${student.id}`);
      }
    }

    if (errors.length > 0) {
      // Return errors if any
      return res.status(400).json({ errors });
    } else {
      // Return the successfully inserted students
      res.status(200).json({ insertedStudents });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  //filter new student Egyptian HousingType is nonspecial

router.post('/filterAndInsertStudents2', async (req, res) => {
  try {
    const { governorateStatus, collegeId } = req.body;
    const query = util.promisify(conn.query).bind(conn);

    // Validate inputs
    if (!governorateStatus || !collegeId) {
      return res.status(400).json({ error: 'Invalid input parameters' });
    }

    // Filter governorates based on status
    const governorateResult = await query(`
      SELECT id FROM governorate WHERE status = ?
    `, [governorateStatus]);

    if (governorateResult.length === 0) {
      return res.status(404).json({ error: 'Governorate not found' });
    }

    // Extract governorate IDs from the result
    const governorateIds = governorateResult.map((governorate) => governorate.id);

    // Filter students based on governorate_ids and college_id
    const filteredStudents = await query(`
    SELECT * FROM newstudent
    WHERE governorate_id IN (?) AND college_id = ? AND Eygptian = true AND HousingType = 'nonspecial' AND SpecialNeed = false
  `, [governorateIds, collegeId]);

    // Insert filtered students into the "status1" table
    const insertedStudents = [];

    // Fetch college name based on college_id
    const collegeResult = await query(`
      SELECT name FROM college WHERE id = ?
    `, [collegeId]);

    if (collegeResult.length === 0) {
      return res.status(404).json({ error: 'College not found' });
    }

    const collegeName = collegeResult[0].name;

    for (const student of filteredStudents) {
      let building_number;

      // Determine building_number based on college_id and gender
      if (collegeId === "1" || collegeId === "22" || collegeId === "3" || collegeId === "5") {
        // College 1 logic
        building_number = student.gender === 'Male' ? "1" : "2";
      } else if (collegeId === "7" || collegeId === "4" || collegeId === "6" || collegeId === "10" || collegeId === "11" || collegeId === "16") {
        // College 2 logic
        building_number = student.gender === 'Male' ? "3" : "12";
      } else if (collegeId === "21" || collegeId === "18" || collegeId === "19" || collegeId === "20" || collegeId === "23") {
        // College 3 logic
        building_number = student.gender === 'Male' ? "5" : "4";
      } else if (collegeId === "8" || collegeId === "9" || collegeId === "12" || collegeId === "13" || collegeId === "14" || collegeId === "15" || collegeId === "17") {
        // College 4 logic
        building_number = student.gender === 'Male' ? "9" : "18";
      } else {
        // Handle other collegeId values or set a default value
        building_number = null; // Change this to your default value
      }

      const existingStudent = await query(`
        SELECT * FROM status1 WHERE national_id = ?
      `, [student.nationalID]);

      if (existingStudent.length === 0) {
        // National ID doesn't exist, proceed with insertion
        const insertResult = await query(`
          INSERT INTO status1 (name, national_id, building_number,  college_name)
          VALUES (?, ?, ?,  ?)
        `, [student.name, student.nationalID, building_number,  collegeName]);

        insertedStudents.push({
          name: student.name,
          nationalID: student.nationalID,
          building_number: building_number,
          college_name: collegeName,
        });
      } else {
        // National ID already exists, collect the error
        return res.status(400).json({ error: `Student with national ID ${student.nationalID} already filtered` });
      }
    }

    res.status(200).json({ insertedStudents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//filter student are Egyptian HousingType is special or Arrival
router.post('/filterAndInsertStudents3', async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);

    // Filter students based on additional conditions
    const filteredStudents = await query(`
      SELECT * FROM newstudent
      WHERE Eygptian = false

      UNION

      SELECT * FROM newstudent
      WHERE Eygptian = true AND HousingType = 'special'
    `);

    // Insert filtered students into the "status2" table
    const insertedStudents = [];
    const errors = [];

    for (const student of filteredStudents) {
      let building_number;
      building_number = student.gender === 'Male' ? 3 : 4;

      // Fetch college name based on college_id
      const collegeResult = await query(`
        SELECT name FROM college WHERE id = ?
      `, [student.college_id]);

      if (collegeResult.length > 0) {
        const collegeName = collegeResult[0].name;

        // Insert student data into status2 table with college name
        const insertResult = await query(`
            INSERT INTO status1 (name, national_id, building_number, college_name)
            VALUES (?, ?, ?,  ?)
          `, [student.name, student.nationalID, building_number, collegeName]);

        insertedStudents.push({
          name: student.name,
          nationalID: student.nationalID,
          building_number: building_number,
          college_name: collegeName,
        });
      } else {
        // Handle the case when collegeResult is empty
        errors.push(`College information not found for student with college ID ${student.college_id}`);
      }
    }

    if (errors.length > 0) {
      // Return errors if any
      return res.status(400).json({ errors });
    } else {
      // Return the successfully inserted students
      res.status(200).json({ insertedStudents });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// filter new student in Giza ==> الواحات البحرية ==>   
 //القليوبية ==.كفر شكر 
 router.post('/filterAndInsertStudents4', async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);

    // Filter students based on condition
    const filteredStudents = await query(`
      SELECT * FROM newstudent
      WHERE SpecialNeed = false AND HousingType = 'nonspecial' AND city_id IN (?, ?)
    `, [79, 236]);

    // Insert filtered students into the "status2" table
    const insertedStudents = [];
    const errors = [];

    for (const student of filteredStudents) {
      let building_number;
      let collegeId;
      let collegeName; // Added variable to store college name

      // Retrieve college_id for the current student
      const collegeResult = await query(`
        SELECT college_id FROM newstudent
        WHERE id = ?
      `, [student.id]);

      // Check if collegeResult is not empty
      if (collegeResult.length > 0) {
        collegeId = collegeResult[0].college_id;

        // Fetch college name based on college_id
        const collegeNameResult = await query(`
          SELECT name FROM college WHERE id = ?
        `, [collegeId]);

        if (collegeNameResult.length > 0) {
          collegeName = collegeNameResult[0].name;
        } else {
          collegeName = 'Unknown College'; // Set a default value if college name is not found
        }

        // Determine building_number based on college_id and gender
        if (collegeId === 1 || collegeId === 22 || collegeId === 3 || collegeId === 5) {
          // College 1 logic
          building_number = student.gender === 'Male' ? 1 : 2;
        } else if (collegeId === 7 || collegeId === 4 || collegeId === 6 || collegeId === 10 || collegeId === 11 || collegeId === 16) {
          // College 2 logic
          building_number = student.gender === 'Male' ? 3 : 12;
        } else if (collegeId === 21 || collegeId === 18 || collegeId === 19 || collegeId === 20 || collegeId === 23) {
          // College 3 logic
          building_number = student.gender === 'Male' ? 5 : 4;
        } else if (collegeId === 8 || collegeId === 9 || collegeId === 12 || collegeId === 13 || collegeId === 14 || collegeId === 15 || collegeId === 17) {
          // College 4 logic
          building_number = student.gender === 'Male' ? 9 : 18;
        } else {
          // Handle other collegeId values or set a default value
          building_number = null; // Change this to your default value
        }
        // Check if the student already exists in status2
        const existingStudent = await query(`
          SELECT * FROM status1 WHERE national_id = ?
        `, [student.nationalID]);

        if (existingStudent.length === 0) {
          // National ID doesn't exist, proceed with insertion
          const insertResult = await query(`
            INSERT INTO status1 (name, national_id, building_number, college_name)
            VALUES (?, ?, ?,  ?)
          `, [student.name, student.nationalID, building_number, collegeName]);

          insertedStudents.push({
            name: student.name,
            nationalID: student.nationalID,
            building_number: building_number,
            college_name: collegeName,
          });
        } else {
          // National ID already exists, collect the error
          errors.push(`Student with national ID ${student.nationalID} already filtered`);
        }
      } else {
        // Handle the case when collegeResult is empty
        errors.push(`College information not found for student with ID ${student.id}`);
      }
    }

    if (errors.length > 0) {
      // Return errors if any
      return res.status(400).json({ errors });
    } else {
      // Return the successfully inserted students
      res.status(200).json({ insertedStudents });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// filter students in old student table that  has special need 
router.post('/filterAndInsertStudents5', async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);

    // Filter students based on SpecialNeed condition
    const filteredStudents = await query(`
      SELECT * FROM oldstudent
      WHERE SpecialNeed = true
    `);

    // Insert filtered students into the "status2" table
    const insertedStudents = [];
    const errors = [];

    for (const student of filteredStudents) {
      let building_number;
      let collegeId;
      let collegeName; // Added variable to store college name

      // Retrieve college_id for the current student
      const collegeResult = await query(`
        SELECT college_id FROM oldstudent
        WHERE id = ?
      `, [student.id]);

      // Check if collegeResult is not empty
      if (collegeResult.length > 0) {
        collegeId = collegeResult[0].college_id;

        // Fetch college name based on college_id
        const collegeNameResult = await query(`
          SELECT name FROM college WHERE id = ?
        `, [collegeId]);

        if (collegeNameResult.length > 0) {
          collegeName = collegeNameResult[0].name;
        } else {
          collegeName = 'Unknown College'; // Set a default value if college name is not found
        }

         // Determine building_number based on college_id and gender
         if (collegeId === 1 || collegeId === 22 || collegeId === 3 || collegeId === 5) {
          // College 1 logic
          building_number = student.gender === 'Male' ? 1 : 2;
        } else if (collegeId === 7 || collegeId === 4 || collegeId === 6 || collegeId === 10 || collegeId === 11 || collegeId === 16) {
          // College 2 logic
          building_number = student.gender === 'Male' ? 3 : 12;
        } else if (collegeId === 21 || collegeId === 18 || collegeId === 19 || collegeId === 20 || collegeId === 23) {
          // College 3 logic
          building_number = student.gender === 'Male' ? 5 : 4;
        } else if (collegeId === 8 || collegeId === 9 || collegeId === 12 || collegeId === 13 || collegeId === 14 || collegeId === 15 || collegeId === 17) {
          // College 4 logic
          building_number = student.gender === 'Male' ? 9 : 18;
        } else {
          // Handle other collegeId values or set a default value
          building_number = null; // Change this to your default value
        }
        // Check if the student already exists in status2
        const existingStudent = await query(`
          SELECT * FROM status2 WHERE national_id = ?
        `, [student.nationalID]);

        if (existingStudent.length === 0) {
          // National ID doesn't exist, proceed with insertion
          const insertResult = await query(`
            INSERT INTO status2 (name, national_id, building_number,  college_name)
            VALUES (?, ?, ?,  ?)
          `, [student.name, student.nationalID, building_number,  collegeName]);

          insertedStudents.push({
            name: student.name,
            nationalID: student.nationalID,
            building_number: building_number,
            college_name: collegeName,
          });
        } else {
          // National ID already exists, collect the error
          errors.push(`Student with national ID ${student.nationalID} already filtered`);
        }
      } else {
        // Handle the case when collegeResult is empty
        errors.push(`College information not found for student with ID ${student.id}`);
      }
    }

    if (errors.length > 0) {
      // Return errors if any
      return res.status(400).json({ errors });
    } else {
      // Return the successfully inserted students
      res.status(200).json({ insertedStudents });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// filter student in old student table  Egyptian and HousingType is nonspecial depend on gpa  and governorate status
router.post('/filterAndInsertStudents6', async (req, res) => {
  try {
    const { governorateStatus, gpaId } = req.body;
    const query = util.promisify(conn.query).bind(conn);

    // Validate inputs
    if (!governorateStatus || !gpaId) {
      return res.status(400).json({ error: 'Invalid input parameters' });
    }

    // Filter governorates based on status
    const governorateResult = await query(`
      SELECT id FROM governorate WHERE status = ?
    `, [governorateStatus]);

    if (governorateResult.length === 0) {
      return res.status(404).json({ error: 'Governorate not found' });
    }

    // Extract governorate IDs from the result
    const governorateIds = governorateResult.map((governorate) => governorate.id);

    // Fetch students including college_id based on governorate_ids and gpa_id
    const filteredStudents = await query(`
      SELECT id, name, nationalID, gender, college_id
      FROM oldstudent
      WHERE governorate_id IN (?) AND gpa_id = ? AND Eygptian = true AND HousingType = 'nonspecial' AND SpecialNeed = false
    `, [governorateIds, gpaId]);

    // Insert filtered students into the "status2" table
    const insertedStudents = [];

    for (const student of filteredStudents) {
      let building_number;

      // Fetch college name based on college_id
      const collegeNameResult = await query(`
        SELECT name FROM college WHERE id = ?
      `, [student.college_id]);

      const collegeName = collegeNameResult.length > 0 ? collegeNameResult[0].name : 'Unknown College';

      if (student.college_id === 1 || student.college_id === 22 || student.college_id === 3 || student.college_id === 5) {
        // College 1 logic
        building_number = student.gender === 'Male' ? 1 : 2;
      } else if (student.college_id === 7 || student.college_id === 4 || student.college_id === 6|| student.college_id === 10 || student.college_id === 11 || student.college_id === 16) {
        // College 2 logic
        building_number = student.gender === 'Male' ? 3 : 12;
      } else if (student.college_id === 21 || student.college_id === 18 || student.college_id === 19 || student.college_id === 20 || student.college_id === 23) {
        // College 3 logic
        building_number = student.gender === 'Male' ? 5 : 4;
      } else if (student.college_id === 8 || student.college_id === 9 || student.college_id === 12 || student.college_id === 13 || student.college_id === 14 || student.college_id === 15|| student.college_id === 17) {
        // College 4 logic
        building_number = student.gender === 'Male' ? 9 : 18;
      } else {
        // Handle other college_id values or set a default value
        building_number = null; // Change this to your default value
      }
      const existingStudent = await query(`
        SELECT * FROM status2 WHERE national_id = ?
      `, [student.nationalID]);

      if (existingStudent.length === 0) {
        // National ID doesn't exist, proceed with insertion
        const insertResult = await query(`
            INSERT INTO status2 (name, national_id, building_number, college_name)
            VALUES (?, ?, ?,  ?)
          `, [student.name, student.nationalID, building_number, collegeName]);

        insertedStudents.push({
          name: student.name,
          nationalID: student.nationalID,
          building_number: building_number,
          college_name: collegeName,
        });
      } else {
        // National ID already exists, send a response to the client
        return res.status(400).json({ error: `Student with national ID ${student.nationalID} already filtered` });
      }
    }

    res.status(200).json({ insertedStudents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//filter student are gpa i want  Egyptian HousingType is special or Arrival
 
router.post('/filterAndInsertStudents7', async (req, res) => {
  try {
    const { gpa_id } = req.body; // Extract gpa_id from request body
    const query = util.promisify(conn.query).bind(conn);

    // Validate inputs
    if (!gpa_id) {
      return res.status(400).json({ error: 'Invalid input parameters' });
    }

    // Filter students based on additional conditions including gpa_id
    const filteredStudents = await query(`
      SELECT * FROM oldstudent
      WHERE Eygptian = false AND gpa_id = ?

      UNION

      SELECT * FROM oldstudent
      WHERE Eygptian = true AND HousingType = 'special' AND gpa_id = ?
    `, [gpa_id, gpa_id]);

    // Insert filtered students into the "status2" table
    const insertedStudents = [];
    const errors = [];

    for (const student of filteredStudents) {
      let building_number;
      building_number = student.gender === 'Male' ? 3 : 4;

      // Fetch college name based on college_id
      const collegeResult = await query(`
        SELECT name FROM college WHERE id = ?
      `, [student.college_id]);

      if (collegeResult.length > 0) {
        const collegeName = collegeResult[0].name;

        // Insert student data into status2 table with college name
        const insertResult = await query(`
            INSERT INTO status2 (name, national_id, building_number, college_name)
            VALUES (?, ?, ?,  ?)
          `, [student.name, student.nationalID, building_number, collegeName]);

        insertedStudents.push({
          name: student.name,
          nationalID: student.nationalID,
          building_number: building_number,
          college_name: collegeName,
        });
      } else {
        // Handle the case when collegeResult is empty
        errors.push(`College information not found for student with college ID ${student.college_id}`);
      }
    }

    if (errors.length > 0) {
      // Return errors if any
      return res.status(400).json({ errors });
    } else {
      // Return the successfully inserted students
      res.status(200).json({ insertedStudents });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// filter old student using gpa is request  in Giza ==> الواحات البحرية ==>   
 //القليوبية ==.كفر شكر 

router.post('/filterAndInsertStudents8', async (req, res) => {
  try {
    const { gpa_id } = req.body; // Extract gpa_id from request body
    const query = util.promisify(conn.query).bind(conn);

    // Validate inputs
    if (!gpa_id) {
      return res.status(400).json({ error: 'Invalid input parameters' });
    }

    // Filter students based on condition including gpa_id
    const filteredStudents = await query(`
      SELECT * FROM oldstudent
      WHERE SpecialNeed = false AND HousingType = 'nonspecial' AND city_id IN (?, ?) AND gpa_id = ?
    `, [79, 236, gpa_id]);

    // Insert filtered students into the "status2" table
    const insertedStudents = [];
    const errors = [];

    for (const student of filteredStudents) {
      let building_number;
      let collegeId;
      let collegeName; // Added variable to store college name

      // Retrieve college_id for the current student
      const collegeResult = await query(`
        SELECT college_id FROM oldstudent
        WHERE id = ?
      `, [student.id]);

      // Check if collegeResult is not empty
      if (collegeResult.length > 0) {
        collegeId = collegeResult[0].college_id;

        // Fetch college name based on college_id
        const collegeNameResult = await query(`
          SELECT name FROM college WHERE id = ?
        `, [collegeId]);

        if (collegeNameResult.length > 0) {
          collegeName = collegeNameResult[0].name;
        } else {
          collegeName = 'Unknown College'; // Set a default value if college name is not found
        }

        // Determine building_number based on college_id and gender
        if (collegeId === 1 || collegeId === 22 || collegeId === 3 || collegeId === 5) {
          // College 1 logic
          building_number = student.gender === 'Male' ? 1 : 2;
        } else if (collegeId === 7 || collegeId === 4 || collegeId === 6 || collegeId === 10 || collegeId === 11 || collegeId === 16) {
          // College 2 logic
          building_number = student.gender === 'Male' ? 3 : 12;
        } else if (collegeId === 21 || collegeId === 18 || collegeId === 19 || collegeId === 20 || collegeId === 23) {
          // College 3 logic
          building_number = student.gender === 'Male' ? 5 : 4;
        } else if (collegeId === 8 || collegeId === 9 || collegeId === 12 || collegeId === 13 || collegeId === 14 || collegeId === 15 || collegeId === 17) {
          // College 4 logic
          building_number = student.gender === 'Male' ? 9 : 18;
        } else {
          // Handle other collegeId values or set a default value
          building_number = null; // Change this to your default value
        }

        // Check if the student already exists in status2
        const existingStudent = await query(`
          SELECT * FROM status2 WHERE national_id = ?
        `, [student.nationalID]);

        if (existingStudent.length === 0) {
          // National ID doesn't exist, proceed with insertion
          const insertResult = await query(`
            INSERT INTO status2 (name, national_id, building_number, college_name)
            VALUES (?, ?, ?,  ?)
          `, [student.name, student.nationalID, building_number, collegeName]);

          insertedStudents.push({
            name: student.name,
            nationalID: student.nationalID,
            building_number: building_number,
            college_name: collegeName,
          });
        } else {
          // National ID already exists, collect the error
          errors.push(`Student with national ID ${student.nationalID} already filtered`);
        }
      } else {
        // Handle the case when collegeResult is empty
        errors.push(`College information not found for student with ID ${student.id}`);
      }
    }

    if (errors.length > 0) {
      // Return errors if any
      return res.status(400).json({ errors });
    } else {
      // Return the successfully inserted students
      res.status(200).json({ insertedStudents });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

