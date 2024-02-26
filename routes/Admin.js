
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const util = require("util");
const conn = require("../db/dbConnection");
const { body, validationResult } = require('express-validator');

// Login route
router.post("/login",
    body("name"),
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
            const user = await query("SELECT * FROM admin WHERE name = ?", [req.body.name]);

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



    // add employee
    //check if admin_id is exist in table admin  
    const validateadminID = async (adminId) => {
        const query = util.promisify(conn.query).bind(conn);

        const adminExists = await query('SELECT * FROM admin WHERE id = ?', [adminId]);

         if (adminExists.length === 0) {
             return Promise.reject('Invalid admin ID');
           }

         return true;
    };
//addemployee
   router.post("/addemployee",
   body("name").isString(),
   body("password").isLength({ min: 5,max:9 }).withMessage('Password must be (5-9) characters'),
   body("admin_id").isInt().custom(validateadminID),

   
  async(req,res)=>{
    try{
        

       //validation request [manual,express validation ]
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        }
        //check employee exist or not 
        const query=util.promisify(conn.query).bind(conn); //transform query mysql ==> promise to use [await/async]
        const checkEmployeeExist=await query("select * from employee where password=?",[req.body.password]);
        if(checkEmployeeExist.length>0){
          res.status(400).json({
             errors:[{ 
               msg:" employee is already exist" 
             }],
           })
         }
       //3- prepare object user 
      const userData={
        name: req.body.name,
        password: req.body.password,
        admin_id:req.body.admin_id 
      }
      
       //4- insert object in to db
       await query("insert into employee set ? ",userData);
       res.status(200).json(userData);
    
    }catch (err){
        console.log(err); //if you want to see where is the error
        res.status(500).json({err:err})
    }

 });
 
// delete employee
router.delete("/deleteemployee/:id", async (req, res) => {
    try {
        // validation request [manual,express validation ]
        const query = util.promisify(conn.query).bind(conn);

        // check if employee exists or not 
        const user = await query("select * from employee where id = ?", [req.params.id]);

        if (!user[0]) {
            res.status(404).json({
                msg: "Employee id not exist"
            });
        }

        // delete employee in database 
        await query("delete from employee where id = ?", [user[0].id]);

        res.status(200).json({
            msg: "Employee deleted successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//update employee info 
router.put("/updateemployee/:id",
body("name").isString(),
body("password").isLength({ min: 8, max: 11 }).withMessage("Please enter a valid password (8-11 characters)"),

async (req, res) => {
    try {
      // validation request [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const query = util.promisify(conn.query).bind(conn);
      const user = await query("select * from employee where id = ?", [req.params.id]);
      if (!user[0]) {
        return res.status(404).json({
          msg: "employee id not exist",
        });
      }
      
      // prepare object user
      const userData = {
        name: req.body.name,
        password:req.body.password
      }

      // update student in the database
      await query("update employee set ? where id=?", [userData, req.params.id]);

      res.status(200).json({
        msg: "employee updated successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//get all employee 
router.get("/getemployees", async (req, res) => {
    try {
        const conn = require("../db/dbConnection");

      const query = util.promisify(conn.query).bind(conn);
  
      // Query to get all employee
      const employees = await query("SELECT name FROM employee ");
  
      res.status(200).json(employees);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  //get all students 
  router.get("/getstudents", async (req, res) => {
    try {
        const conn = require("../db/dbConnection");

      const query = util.promisify(conn.query).bind(conn);
  
      // Query to get all students
      const students = await query(`
      SELECT * FROM oldstudent
      UNION
      SELECT * FROM newstudent
     `);  
      res.status(200).json(students);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // ADD college 
  router.post("/addcollege",
  body("name").isString(),
  async(req,res)=>{
   try{
       

      //validation request [manual,express validation ]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
       }
       //check employee exist or not 
       const query=util.promisify(conn.query).bind(conn); //transform query mysql ==> promise to use [await/async]
       const checkCollegeExist=await query("select * from college where name=?",[req.body.name]);
       if(checkCollegeExist.length>0){
         res.status(400).json({
            errors:[{ 
              msg:" college is already exist" 
            }],
          })
        }
      //3- prepare object user 
     const college={
       name: req.body.name,
    
     }
     
      //4- insert object in to db
      await query("insert into college set ? ",college);
      res.status(200).json(college);
   
   }catch (err){
       console.log(err); //if you want to see where is the error
       res.status(500).json({err:err})
   }

});
//get all college
router.get("/getcollege", async (req, res) => {
  try {
      const conn = require("../db/dbConnection");

    const query = util.promisify(conn.query).bind(conn);

    // Query to get all employee
    const colleges = await query("SELECT name FROM college ");

    res.status(200).json(colleges);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//update college 
router.put("/updatecollege/:id",
body("name").isString(),

async (req, res) => {
    try {
      // validation request [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const query = util.promisify(conn.query).bind(conn);
      const user = await query("select * from college where id = ?", [req.params.id]);
      if (!user[0]) {
        return res.status(404).json({
          msg: "college id not exist",
        });
      }
      
      // prepare object user
      const userData = {
        name: req.body.name
      }

      // update student in the database
      await query("update college set ? where id=?", [userData, req.params.id]);

      res.status(200).json({
        msg: "college updated successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  //delete college
  router.delete("/deletecollege/:id", async (req, res) => {
    try {
        // validation request [manual,express validation ]
        const query = util.promisify(conn.query).bind(conn);

        // check if employee exists or not 
        const college = await query("select * from college where id = ?", [req.params.id]);

        if (!college[0]) {
            res.status(404).json({
                msg: "college id not exist"
            });
        }

        // delete employee in database 
        await query("delete from college where id = ?", [college[0].id]);

        res.status(200).json({
            msg: "college deleted successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
module.exports = router;
