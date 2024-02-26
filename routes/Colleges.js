
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const util = require("util");
const conn = require("../db/dbConnection");
const { body, validationResult } = require('express-validator');
   
//get all name of college  
router.get("/getcolleges", async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
  
      // Query to get all names of governorates
      const colleges = await query("SELECT * FROM college");
  
      res.status(200).json(colleges);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  //get all levels depend on college_id 
  router.get('/levels/:collegeId', async (req, res) => {
    try {
      const collegeId = req.params.collegeId;
      const query = util.promisify(conn.query).bind(conn);
  
      // Use a JOIN query to get levels associated with the specified college ID
      const levels = await query(`
        SELECT levels.*
        FROM levels
        JOIN collegelevel ON levels.id = collegelevel.level_id
        WHERE collegelevel.college_id = ?
      `, [collegeId]);
  
      res.status(200).json({ levels });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
    
  // get all gpa name
  router.get("/getgpa", async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
  
      // Query to get all names of governorates
      const gpa = await query("SELECT name FROM gba");
  
      res.status(200).json(gpa);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  //get all gpa depend on college 
  
  module.exports = router;
