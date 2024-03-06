
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const util = require("util");
const conn = require("../db/dbConnection");
const fs=require("fs");
const upload=require("../middleware/uploadimages");

const { body, validationResult } = require('express-validator');
   
   
// Login route
//function login for oldstudent and new student 
router.post("/login",
    body("nationalID").isLength({ min: 9, max: 14 }).withMessage("Please enter a valid nationalID (9-14 characters)"),
    body("password").isLength({ min: 9, max: 14 }).withMessage("Please enter a valid password (8-100 characters)"),
    async (req, res) => {
        try {
            // Validation of request parameters
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Check if the user exists in the database
            const query = util.promisify(conn.query).bind(conn);
            
            const result = await query(`
            SELECT * FROM oldstudent WHERE nationalID = ?
            UNION
            SELECT * FROM newstudent WHERE nationalID = ?
            `, [req.body.nationalID, req.body.nationalID]);


            if (result.length === 0) {
                return res.status(404).json({
                    errors: [{
                        msg: "User not found"
                    }],
                });
            }
            
           //i dont use bcrypt
          if (req.body.password === result[0].password) {
            // Passwords match
            return res.status(200).json(result);
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

//addrequest 


        //to check if college_id is exist in table college 

        const validateCollegeId = async (collegeId) => {
            const query = util.promisify(conn.query).bind(conn);
   
            const collegeExists = await query('SELECT * FROM college WHERE id = ?', [collegeId]);
   
             if (collegeExists.length === 0) {
                 return Promise.reject('Invalid college ID');
               }
   
             return true;
           };

        //to check if level_id is exist in table level 
        const validateLevelID = async (levelId) => {
            const query = util.promisify(conn.query).bind(conn);
   
            const levelExists = await query('SELECT * FROM levels WHERE id = ?', [levelId]);
   
             if (levelExists.length === 0) {
                 return Promise.reject('Invalid level ID');
               }
   
             return true;
           };

        //check if gpa_id is exist in table gpa   
        const validateGpaID = async (gpaId) => {
            const query = util.promisify(conn.query).bind(conn);
   
            const gpaExists = await query('SELECT * FROM gba WHERE id = ?', [gpaId]);
   
             if (gpaExists.length === 0) {
                 return Promise.reject('Invalid gpa ID');
               }
   
             return true;
        };

        //check if governorate_id is exist in table gpa  
        const validateGovernorateID = async (governorateId) => {
            const query = util.promisify(conn.query).bind(conn);
   
            const governorateExists = await query('SELECT * FROM governorate WHERE id = ?', [governorateId]);
   
             if (governorateExists.length === 0) {
                 return Promise.reject('Invalid governorate ID');
               }
   
             return true;
        };

        //check if city_id is exist in table city  
        const validateCityID = async (cityId) => {
            const query = util.promisify(conn.query).bind(conn);
   
            const cityExists = await query('SELECT * FROM city WHERE id = ?', [cityId]);
   
             if (cityExists.length === 0) {
                 return Promise.reject('Invalid city ID');
               }
   
             return true;
        };

     


//add request foe new student
   router.post("/addrequestnewstudent",
   upload.single("image"),
   body("name").isString(),
   body("Eygptian").isBoolean(),
   body("nationalID").isString().isLength({ min:9 ,max:14}).withMessage("please enter valid nationalID "),
   body("studentCode").isString().isLength({min:11,max:11}).withMessage("studentcode should be 11 character"),
   body("birthDate").isDate().withMessage("enter your birthdate"),
   body('gender').isIn(['Male', 'Female']),
   body('religion').isIn(['muslim', 'christian']),
   body("phoneNumber").isString().isLength({min:11,max:11}).withMessage("phone number should be 11 character"),
   body("mobileNumber").isString().isLength({min:11,max:11}).withMessage("mopile number should be 11 character"),
   body("fatherName").isString(),
   body("fatherNationalID").isString().isLength({ min:9 ,max:14}).withMessage("please enter valid nationalID "),
   body("fatherOccupation").isString(),
   body("fatherphone").isString().isLength({min:11,max:11}).withMessage("phone number should be 11 character"),
   body("GuardianName").isString(),
   body("GuardianNationalID").isString().isLength({ min:9 ,max:14}).withMessage("please enter valid nationalID "),
   body('ParentsStatus').optional().isIn(['Father Death', 'Parents Death','Parental Separation','Alive']),
   body("GuardianPhoneNumber").isString().isLength({min:11,max:11}).withMessage("phone number should be 11 character"),
   body("GuardianRelation").isString(),
   body('HousingType').isIn(['nonspecial', 'special']),
   body("HousingWithoutCatering").isBoolean(),
   body("FamilyAbroad").isBoolean(),
   body("SpecialNeed").isBoolean(),
   body("SecondaryEducationTotalScore").isDecimal(),
   body("SecondaryEducationRate").isDecimal(),
   body("SecondaryEducationAbroad").isBoolean(),
   body('SecondaryEducationDivision').isIn(['علمى علوم',
    'علمى رياضة',
    'ادبى',
    'ازهرى علمى',
    'ازهرى ادبى',
    'معاهد فنية ثلاث سنوات',
    'معاهد فنية اربع سنوات',
    'معاهد فنية خمس سنوات',
    'دبلومات فنية',
    'شهادات معادلة',
    'مدارس  STEM  للعلوم و التكنولوجيا',
    'مدارس النيل للعلوم و التكنولوجيا',
    'تحويل رقمى']),
   body("password").isLength({ min: 9,max:14 }).withMessage('Password must be (9-14) characters'),
   body("college_id").isInt().custom(validateCollegeId),
   body("level_id").isInt().custom(validateLevelID),
   body('governorate_id').isInt().custom(validateGovernorateID),
   body("city_id").isInt().custom(validateCityID),
   body("address").isString(),
   body("building_id").optional().isInt(),
   body("employee_id").optional().isInt(),
   body("admin_id").optional().isInt(),
   body("ConfirmPassword").isLength({min:9,max:14}).withMessage("confirm password (9-14) character"),


  async(req,res)=>{
    try{
        

       //validation request [manual,express validation ]
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        }

        const query=util.promisify(conn.query).bind(conn); //transform query mysql ==> promise to use [await/async]
        const checkstudentExist=await query("select * from newstudent where nationalID=?",[req.body.nationalID]);
        if(checkstudentExist.length>0){
          res.status(400).json({
             errors:[{ 
               msg:" student is already exist" 
             }],
           })
         }
       //check if password is equal nationalID and password equal confirm password
       // Combined condition for checking nationalID, password, and ConfirmPassword
        if (req.body.password !== req.body.nationalID || req.body.ConfirmPassword !== req.body.password) {
            return res.status(400).json({
                errors: [{
                    msg: "Password or confirm_password is not correct"
                }],
            });
        }
        //validate the image
        if(!req.file){
         return res.status(400).json({
            errors:[{ 
                msg:" image is required" 
          }],  
         });
        }

      //3- prepare object user 
      const userData={
        image_url:req.file.originalname,
        name: req.body.name,
        Eygptian:req.body.Eygptian,
        nationalID:req.body.nationalID,
        studentCode:req.body.studentCode,
        birthDate:req.body.birthDate,
        gender:req.body.gender,
        religion:req.body.religion,
        phoneNumber:req.body.phoneNumber,
        mobileNumber:req.body.mobileNumber,
        fatherName:req.body.fatherName,
        fatherNationalID:req.body.fatherNationalID,
        fatherPhone:req.body.fatherphone,
        GuardianName:req.body.GuardianName,
        GuardianNationalID:req.body.GuardianNationalID,
        ParentsStatus:req.body.ParentsStatus|| null,
        GuardianPhoneNumber:req.body.GuardianPhoneNumber,
        GuardianRelation:req.body.GuardianRelation,
        HousingType:req.body.HousingType,
        HousingWithoutCatering:req.body.HousingWithoutCatering,
        FamilyAbroad:req.body.FamilyAbroad,
        SpecialNeed:req.body.SpecialNeed,
        SecondaryEducationTotalScore:req.body.SecondaryEducationTotalScore,
        SecondaryEducationRate:req.body.SecondaryEducationRate,
        SecondaryEducationAbroad:req.body.SecondaryEducationAbroad,
        SecondaryEducationDivision:req.body.SecondaryEducationDivision,
        password:req.body.password,
        ConfirmPassword:req.body.ConfirmPassword,
        college_id:req.body.college_id,
        level_id:req.body.level_id,
        governorate_id:req.body.governorate_id,
        city_id:req.body.city_id,
        address:req.body.address,
        building_id:req.body.building_id || null,
        employee_id:req.body.employee_id || null,
        admin_id:req.body.admin_id || null

       }
      // const query = util.promisify(conn.query).bind(conn);
       //4- insert object in to db
       await query("insert into newstudent set ? ",userData);
       res.status(200).json(userData);
    
    }catch (err){
        console.log(err); //if you want to see where is the error
        res.status(500).json({err:err.message || 'Internal Server Error'})
    }

 });

//add request foe old student 
router.post("/addrequestoldstudent",
upload.single("image"),
body("name").isString(),
body("Eygptian").isBoolean(),
body("nationalID").isString().isLength({ min:9 ,max:14}).withMessage("please enter valid nationalID "),
body("studentCode").isString().isLength({min:11,max:11}).withMessage("studentcode should be 11 character"),
body("birthDate").isDate().withMessage("enter your birthdate"),
body('gender').isIn(['Male', 'Female']),
body('religion').isIn(['muslim', 'christian']),
body("phoneNumber").isString().isLength({min:11,max:11}).withMessage("phone number should be 11 character"),
body("mobileNumber").isString().isLength({min:11,max:11}).withMessage("mopile number should be 11 character"),
body("fatherName").isString(),
body("fatherNationalID").isString().isLength({ min:9 ,max:14}).withMessage("please enter valid nationalID "),
body("fatherOccupation").isString(),
body("fatherphone").isString().isLength({min:11,max:11}).withMessage("phone number should be 11 character"),
body("GuardianName").isString(),
body("GuardianNationalID").isString().isLength({ min:9 ,max:14}).withMessage("please enter valid nationalID "),
body('ParentsStatus').optional().isIn(['Father Death', 'Parents Death','Parental Separation','Alive']),
body("GuardianPhoneNumber").isString().isLength({min:11,max:11}).withMessage("phone number should be 11 character"),
body("GuardianRelation").isString(),
body('HousingType').isIn(['nonspecial', 'special']),
body('HousingPreviousYear').isIn(['Old', 'New','Interrupted']),
body("successRate").isDecimal(),
body("HousingWithoutCatering").isBoolean(),
body("FamilyAbroad").isBoolean(),
body("SpecialNeed").isBoolean(),
body("password").isLength({ min: 9,max:14 }).withMessage('Password must be (9-14) characters'),
body("college_id").isInt().custom(validateCollegeId),
body("Department").isString(),
body("level_id").isInt().custom(validateLevelID),
body("gpa_id").isInt().custom(validateGpaID),
body('governorate_id').isInt().custom(validateGovernorateID),
body("city_id").isInt().custom(validateCityID),
body("address").isString(),
body("building_id").optional().isInt(),
body("employee_id").optional().isInt(),
body("admin_id").optional().isInt(),
body("ConfirmPassword").isLength({min:9,max:14}).withMessage("confirm password (9-14) character"),


async(req,res)=>{
 try{
     

    //validation request [manual,express validation ]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     res.status(400).json({ errors: errors.array() });
     }
     //for cleaning national_id from spaces
     const cleanednationalIDNumber = req.body.nationalID.trim();
     const query = util.promisify(conn.query).bind(conn);
     const checkstudentExist=await query("select * from oldstudent where nationalID=?",cleanednationalIDNumber);
     if(checkstudentExist.length>0){
       res.status(400).json({
          errors:[{ 
            msg:" student is already exist" 
          }],
        })
      }

    //check if password is equal nationalID and password equal confirm password
    // Combined condition for checking nationalID, password, and ConfirmPassword
     if (req.body.password !== req.body.nationalID || req.body.ConfirmPassword !== req.body.password) {
         return res.status(400).json({
             errors: [{
                 msg: "Password or confirm_password is not correct"
             }],
         });
     }
     //validate the image
     if(!req.file){
      return res.status(400).json({
         errors:[{ 
             msg:" image is required" 
       }],  
      });
     }

   //3- prepare object user 
   const userData={
     image_url:req.file.originalname,
     name: req.body.name,
     Eygptian:req.body.Eygptian,
     nationalID:req.body.nationalID,
     studentCode:req.body.studentCode,
     birthDate:req.body.birthDate,
     gender:req.body.gender,
     religion:req.body.religion,
     phoneNumber:req.body.phoneNumber,
     mobileNumber:req.body.mobileNumber,
     fatherName:req.body.fatherName,
     fatherNationalID:req.body.fatherNationalID,
     fatherPhone:req.body.fatherphone,
     GuardianName:req.body.GuardianName,
     GuardianNationalID:req.body.GuardianNationalID,
     ParentsStatus:req.body.ParentsStatus|| null,
     GuardianPhoneNumber:req.body.GuardianPhoneNumber,
     GuardianRelation:req.body.GuardianRelation,
     HousingType:req.body.HousingType,
     HousingInPreviousYear:req.body.HousingPreviousYear,
     successRate:req.body.successRate,
     HousingWithoutCatering:req.body.HousingWithoutCatering,
     FamilyAbroad:req.body.FamilyAbroad,
     SpecialNeed:req.body.SpecialNeed,
     password:req.body.password,
     ConfirmPassword:req.body.ConfirmPassword,
     college_id:req.body.college_id,
     Department:req.body.Department,
     level_id:req.body.level_id,
     gpa_id:req.body.gpa_id,
     governorate_id:req.body.governorate_id,
     city_id:req.body.city_id,
     address:req.body.address,
     building_id:req.body.building_id || null,
     employee_id:req.body.employee_id || null,
     admin_id:req.body.admin_id || null

    }
    //4- insert object in to db
    await query("insert into oldstudent set ? ",userData);
    res.status(200).json(userData);
 
 }catch (err){
     console.log(err); //if you want to see where is the error
     res.status(500).json({err:err.message || 'Internal Server Error'})
 }

});


 
//update new student info 
router.put("/updatenewstudent/:id",
upload.single("image"),
body("name").isString(),
body("Eygptian").isBoolean(),
body("nationalID").isString().isLength({ min:9 ,max:14}).withMessage("please enter valid nationalID "),
body("studentCode").isString().isLength({min:11,max:11}).withMessage("studentcode should be 11 character"),
body("birthDate").isDate().withMessage("enter your birthdate"),
body('gender').isIn(['Male', 'Female']),
body('religion').isIn(['muslim', 'christian']),
body("phoneNumber").isString().isLength({min:11,max:11}).withMessage("phone number should be 11 character"),
body("mobileNumber").isString().isLength({min:11,max:11}).withMessage("mopile number should be 11 character"),
body("fatherName").isString(),
body("fatherNationalID").isString().isLength({ min:9 ,max:14}).withMessage("please enter valid nationalID "),
body("fatherOccupation").isString(),
body("fatherphone").isString().isLength({min:11,max:11}).withMessage("phone number should be 11 character"),
body("GuardianName").isString(),
body("GuardianNationalID").isString().isLength({ min:9 ,max:14}).withMessage("please enter valid nationalID "),
body('ParentsStatus').optional({ nullable: true }).isString().isIn(['Father Death', 'Parents Death','Parental Separation','Alive']),
body("GuardianPhoneNumber").isString().isLength({min:11,max:11}).withMessage("phone number should be 11 character"),
body("GuardianRelation").isString(),
body('HousingType').isIn(['nonspecial', 'special']),
body("HousingWithoutCatering").isBoolean(),
body("FamilyAbroad").isBoolean(),
body("SpecialNeed").isBoolean(),
body("SecondaryEducationTotalScore").isDecimal(),
body("SecondaryEducationRate").isDecimal(),
body("SecondaryEducationAbroad").isBoolean(),
body('SecondaryEducationDivision').isIn(['علمى علوم',
 'علمى رياضة',
 'ادبى',
 'ازهرى علمى',
 'ازهرى ادبى',
 'معاهد فنية ثلاث سنوات',
 'معاهد فنية اربع سنوات',
 'معاهد فنية خمس سنوات',
 'دبلومات فنية',
 'شهادات معادلة',
 'مدارس  STEM  للعلوم و التكنولوجيا',
 'مدارس النيل للعلوم و التكنولوجيا',
 'تحويل رقمى']),
body("password").isLength({ min: 9,max:14 }).withMessage('Password must be (9-14) characters'),
body("college_id").isInt().custom(validateCollegeId),
body("level_id").isInt().custom(validateLevelID),
body('governorate_id').isInt().custom(validateGovernorateID),
body("city_id").isInt().custom(validateCityID),
body("address").isString(),
body("building_id").optional().isInt(),
body("employee_id").optional().isInt(),
body("admin_id").optional().isInt(),
body("ConfirmPassword").isLength({min:9,max:14}).withMessage("confirm password (9-14) character"),


  async (req, res) => {
    try {
      // validation request [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // check if password is equal nationalID and password equal confirm password
      if (req.body.password !== req.body.nationalID || req.body.ConfirmPassword !== req.body.password) {
        return res.status(400).json({
          errors: [{ msg: "Password or confirm_password is not correct" }],
        });
      }

      // check if student exists
      const query = util.promisify(conn.query).bind(conn);
      const user = await query("select * from newstudent where id = ?", [req.params.id]);
      if (!user[0]) {
        return res.status(404).json({
          msg: "student id not exist",
        });
      }

      // prepare object user
      const userData = {
        image_url:req.file.originalname,
        name: req.body.name,
        Eygptian:req.body.Eygptian,
        nationalID:req.body.nationalID,
        studentCode:req.body.studentCode,
        birthDate:req.body.birthDate,
        gender:req.body.gender,
        religion:req.body.religion,
        phoneNumber:req.body.phoneNumber,
        mobileNumber:req.body.mobileNumber,
        fatherName:req.body.fatherName,
        fatherNationalID:req.body.fatherNationalID,
        fatherPhone:req.body.fatherphone,
        GuardianName:req.body.GuardianName,
        GuardianNationalID:req.body.GuardianNationalID,
        ParentsStatus:req.body.ParentsStatus|| null,
        GuardianPhoneNumber:req.body.GuardianPhoneNumber,
        GuardianRelation:req.body.GuardianRelation,
        HousingType:req.body.HousingType,
        HousingWithoutCatering:req.body.HousingWithoutCatering,
        FamilyAbroad:req.body.FamilyAbroad,
        SpecialNeed:req.body.SpecialNeed,
        SecondaryEducationTotalScore:req.body.SecondaryEducationTotalScore,
        SecondaryEducationRate:req.body.SecondaryEducationRate,
        SecondaryEducationAbroad:req.body.SecondaryEducationAbroad,
        SecondaryEducationDivision:req.body.SecondaryEducationDivision,
        password:req.body.password,
        ConfirmPassword:req.body.ConfirmPassword,
        college_id:req.body.college_id,
        level_id:req.body.level_id,
        governorate_id:req.body.governorate_id,
        city_id:req.body.city_id,
        address:req.body.address,
        building_id:req.body.building_id || null,
        employee_id:req.body.employee_id || null,
        admin_id:req.body.admin_id || null

      };
     // Check if a new image is provided in the request
     if (req.file && fs.existsSync("./upload/" + user[0].image_url)) {
      // File exists and a new image is provided, proceed with deletion
      fs.unlinkSync("./upload/" + user[0].image_url);
       }

      // Check if no new image is provided and the existing image still exists
      if (!req.file && !fs.existsSync("./upload/" + user[0].image_url)) {
      // No new image provided and existing image still exists, do something (e.g., log a message)
      }


      // update student in the database
      await query("update newstudent set ? where id=?", [userData, user[0].id]);

      res.status(200).json({
        msg: "student updated successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  //update oldstudent info 
router.put("/updateoldstudent/:id",
upload.single("image"),
body("name").isString(),
body("Eygptian").isBoolean(),
body("nationalID").isString().isLength({ min:9 ,max:14}).withMessage("please enter valid nationalID "),
body("studentCode").isString().isLength({min:11,max:11}).withMessage("studentcode should be 11 character"),
body("birthDate").isDate().withMessage("enter your birthdate"),
body('gender').isIn(['Male', 'Female']),
body('religion').isIn(['muslim', 'christian']),
body("phoneNumber").isString().isLength({min:11,max:11}).withMessage("phone number should be 11 character"),
body("mobileNumber").isString().isLength({min:11,max:11}).withMessage("mopile number should be 11 character"),
body("fatherName").isString(),
body("fatherNationalID").isString().isLength({ min:9 ,max:14}).withMessage("please enter valid nationalID "),
body("fatherOccupation").isString(),
body("fatherphone").isString().isLength({min:11,max:11}).withMessage("phone number should be 11 character"),
body("GuardianName").isString(),
body("GuardianNationalID").isString().isLength({ min:9 ,max:14}).withMessage("please enter valid nationalID "),
body('ParentsStatus').optional().isIn(['Father Death', 'Parents Death','Parental Separation','Alive']),
body("GuardianPhoneNumber").isString().isLength({min:11,max:11}).withMessage("phone number should be 11 character"),
body("GuardianRelation").isString(),
body('HousingType').isIn(['nonspecial', 'special']),
body('HousingPreviousYear').isIn(['Old', 'New','Interrupted']),
body("successRate").isDecimal(),
body("HousingWithoutCatering").isBoolean(),
body("FamilyAbroad").isBoolean(),
body("SpecialNeed").isBoolean(),
body("password").isLength({ min: 9,max:14 }).withMessage('Password must be (9-14) characters'),
body("college_id").isInt().custom(validateCollegeId),
body("Department").isString(),
body("level_id").isInt().custom(validateLevelID),
body("gpa_id").isInt().custom(validateGpaID),
body('governorate_id').isInt().custom(validateGovernorateID),
body("city_id").isInt().custom(validateCityID),
body("address").isString(),
body("building_id").optional().isInt(),
body("employee_id").optional().isInt(),
body("admin_id").optional().isInt(),
body("ConfirmPassword").isLength({min:9,max:14}).withMessage("confirm password (9-14) character"),

  async (req, res) => {
    try {
      // validation request [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // check if password is equal nationalID and password equal confirm password
      if (req.body.password !== req.body.nationalID || req.body.ConfirmPassword !== req.body.password) {
        return res.status(400).json({
          errors: [{ msg: "Password or confirm_password is not correct" }],
        });
      }

      // check if student exists
      const query = util.promisify(conn.query).bind(conn);
      const user = await query("select * from oldstudent where id = ?", [req.params.id]);
      if (!user[0]) {
        return res.status(404).json({
          msg: "student id not exist",
        });
      }

      // prepare object user
      const userData = {
        image_url:req.file.originalname,
        name: req.body.name,
        Eygptian:req.body.Eygptian,
        nationalID:req.body.nationalID,
        studentCode:req.body.studentCode,
        birthDate:req.body.birthDate,
        gender:req.body.gender,
        religion:req.body.religion,
        phoneNumber:req.body.phoneNumber,
        mobileNumber:req.body.mobileNumber,
        fatherName:req.body.fatherName,
        fatherNationalID:req.body.fatherNationalID,
        fatherPhone:req.body.fatherphone,
        GuardianName:req.body.GuardianName,
        GuardianNationalID:req.body.GuardianNationalID,
        ParentsStatus:req.body.ParentsStatus|| null,
        GuardianPhoneNumber:req.body.GuardianPhoneNumber,
        GuardianRelation:req.body.GuardianRelation,
        HousingType:req.body.HousingType,
        HousingInPreviousYear:req.body.HousingPreviousYear,
        successRate:req.body.successRate,
        HousingWithoutCatering:req.body.HousingWithoutCatering,
        FamilyAbroad:req.body.FamilyAbroad,
        SpecialNeed:req.body.SpecialNeed,
        password:req.body.password,
        ConfirmPassword:req.body.ConfirmPassword,
        college_id:req.body.college_id,
        Department:req.body.Department,
        level_id:req.body.level_id,
        gpa_id:req.body.gpa_id,
        governorate_id:req.body.governorate_id,
        city_id:req.body.city_id,
        address:req.body.address,
        building_id:req.body.building_id || null,
        employee_id:req.body.employee_id || null,
        admin_id:req.body.admin_id || null
   
      };

     // Check if a new image is provided in the request
      if (req.file && fs.existsSync("./upload/" + user[0].image_url)) {
      // File exists and a new image is provided, proceed with deletion
      fs.unlinkSync("./upload/" + user[0].image_url);
       }

     // Check if no new image is provided and the existing image still exists
     if (!req.file && !fs.existsSync("./upload/" + user[0].image_url)) {
      // No new image provided and existing image still exists, do something (e.g., log a message)
    }

// Rest of the code for updating the student record

      // update student in the database
      await query("update oldstudent set ? where id=?", [userData, user[0].id]);

      res.status(200).json({
        msg: "student updated successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });



// function search 
router.post('/searchStudent', async (req, res) => {
  try {
    const { national_id } = req.body;
    const query = util.promisify(conn.query).bind(conn);

    // Search in status1 table
    const status1Result = await query(`
      SELECT name, national_id, building_number, college_name
      FROM status1
      WHERE national_id = ?
    `, [national_id]);

    if (status1Result.length > 0) {
      return res.status(200).json({ result: status1Result });
    }

    // Search in status2 table
    const status2Result = await query(`
      SELECT name, national_id, building_number, college_name
      FROM status2
      WHERE national_id = ?
    `, [national_id]);

    if (status2Result.length > 0) {
      return res.status(200).json({ result: status2Result });
    }

    // Search in oldstudent table if gpa not 5 or 6 or 7 or 8 and in status 1 or 2 or 3 or 4
    const oldStudentResult = await query(`
    SELECT os.name, os.nationalID, c.name AS college_name, g.status AS governorate_status
    FROM oldstudent os
    JOIN college c ON os.college_id = c.id
    JOIN governorate g ON os.governorate_id = g.id
    WHERE os.nationalID = ? AND os.gpa_id NOT IN (5, 6, 7, 8)
  `, [national_id]);
  
  if (oldStudentResult.length > 0) {
    const student = oldStudentResult[0];
    const { name, national_id, college_name, governorate_status } = student;
  
    // Check governorate status
    if (governorate_status === 1 || governorate_status === 2 || governorate_status === 3 || governorate_status === 4) {
      return res.status(200).json({
        result: { name, national_id, college_name },
        message: 'GPA not good enough to be accepted or Governorate status not suitable.'
      });
    } 
  } 

    // Continue searching in oldstudent table based on different conditions
    const oldStudentCityResult = await query(`
      SELECT os.name, os.nationalID, c.name AS college_name
      FROM oldstudent os
      JOIN college c ON os.college_id = c.id
      WHERE os.nationalID = ? AND os.gpa_id NOT IN (5, 6, 7, 8) AND os.city_id IN (79, 236)
    `, [national_id]);

    if (oldStudentCityResult.length > 0) {
      return res.status(200).json({
        result: oldStudentCityResult,
        message: 'GPA not good enough to be accepted in the specified city.'
      });
    }
    // old student gpa not 5 or 6 or 7 or 8 and city not 79 or 236
    const oldStudentOutOfRangeResult = await query(`
      SELECT os.name, os.nationalID, c.name AS college_name
      FROM oldstudent os
      JOIN college c ON os.college_id = c.id
      WHERE os.nationalID = ? AND os.gpa_id NOT IN (5, 6, 7, 8) AND os.city_id NOT IN (79, 236)
    `, [national_id]);

    if (oldStudentOutOfRangeResult.length > 0) {
      return res.status(200).json({
        result: oldStudentOutOfRangeResult,
        message: 'استبعاد النطاق (Out of Range).'
      });
    }
    //search in old student if gpa is 5 or 6 or 7 or 8 and in city not )79 or 236 
     const oldStudentOutOfRangeResult2 = await query(`
      SELECT os.name, os.nationalID, c.name AS college_name
      FROM oldstudent os
      JOIN college c ON os.college_id = c.id
      WHERE os.nationalID = ? AND os.gpa_id  IN (5, 6, 7, 8) AND os.city_id NOT IN (79, 236)
    `, [national_id]);

    if (oldStudentOutOfRangeResult2.length > 0) {
      return res.status(200).json({
        result: oldStudentOutOfRangeResult2,
        message: 'استبعاد النطاق (Out of Range).'
      });
    }
    //  searching in newstudent table based on different conditions
    const newStudentCityResult = await query(`
      SELECT ns.name, ns.nationalID, c.name AS college_name
      FROM newstudent ns
      JOIN college c ON ns.college_id = c.id
      WHERE ns.nationalID = ? AND ns.city_id NOT IN (79, 236)
    `, [national_id]);

    if (newStudentCityResult.length > 0) {
      return res.status(200).json({
        result: newStudentCityResult,
        message: 'رفض النطاق (City Rejection).'
      });
    }

    // Return a default message
    return res.status(200).json({
      message: 'لم يتم مراجعة بياناتك (Your data has not been reviewed).'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

