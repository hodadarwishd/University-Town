const express = require("express");
const router = express.Router();
const util = require("util");
const conn = require("../db/dbConnection");

//get all name of governorate  
router.get("/getgovernorates", async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);

    // Query to get all names of governorates
    const governorates = await query("SELECT name FROM governorate");

    res.status(200).json(governorates);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get governorate depend on id 
router.get("/getgovernorateid/:governorateId", async (req, res) => {
  try {
    const governorateId = req.params.governorateId;
    const query = util.promisify(conn.query).bind(conn);

    // Example query to retrieve a specific governorate based on ID
    const governorate = await query('SELECT * FROM governorate WHERE id = ?', [governorateId]);

    if (governorate.length === 0) {
      return res.status(404).json({ error: "Governorate not found" });
    }

    res.status(200).json(governorate[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



//get all cities depend on governorate_id 
router.get('/cities/:governorate_id', async (req, res) => {
  try {
    const governorateId = req.params.governorate_id;

    const query = util.promisify(conn.query).bind(conn);

    const cities = await query(
      'SELECT city.* FROM city JOIN governorate ON city.governorate_id = governorate.id WHERE governorate.id = ?',
      [governorateId]
    );

    res.status(200).json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get all cities depend on governorate_name 
router.get('/cities/:governorate_name', async (req, res) => {
  try {
    const governorateName = req.params.governorate_name;

    const query = util.promisify(conn.query).bind(conn);

    const cities = await query(
      'SELECT city.* FROM city JOIN governorate ON city.governorate_id = governorate.id WHERE governorate.name = ?',
      [governorateName]
    );

    res.status(200).json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get all name of cities  
router.get("/getcities", async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);

    // Query to get all names of governorates
    const cities = await query("SELECT * FROM city");

    res.status(200).json(cities);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//update governorate 
router.post("/updatestudentgovernorate", async (req, res) => {
  try {
    const { studentId, governorateName } = req.body;

    // Validate inputs
    if (!studentId || !governorateName) {
      return res.status(400).json({ error: "Invalid input parameters" });
    }
    const query = util.promisify(conn.query).bind(conn);

    // Perform a lookup to get the governorate_id based on the governorate name
    const governorateResult = await query(`
      SELECT id FROM governorate WHERE name = ?
    `, [governorateName]);

    if (governorateResult.length === 0) {
      return res.status(404).json({ error: "Governorate not found" });
    }

    const governorateId = governorateResult[0].id;

    // Update the governorate_id in the student table
    const updateResult = await query(`
      UPDATE student
      SET governorate_id = ?
      WHERE id = ?
    `, [governorateId, studentId]);

    // Check the affected rows to determine if the update was successful
    if (updateResult.affectedRows > 0) {
      return res.status(200).json({ msg: "Governorate updated successfully" });
    } else {
      return res.status(404).json({ error: "Student not found or no changes made" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
