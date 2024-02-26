
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
   body("Arrival").isBoolean(),
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
        Arrival:req.body.Arrival,
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
body("Arrival").isBoolean(),
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
     
     const query = util.promisify(conn.query).bind(conn);
     const checkstudentExist=await query("select * from oldstudent where nationalID=?",[req.body.nationalID]);
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
     Arrival:req.body.Arrival,
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
body("Arrival").isBoolean(),
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
        Arrival:req.body.Arrival,
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

      if (fs.existsSync("./upload/" + user[0].image_url)) {
        // File exists, proceed with deletion
        fs.unlinkSync("./upload/" + user[0].image_url);
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

  //update new student info 
router.put("/updateoldstudent/:id",
upload.single("image"),
body("name").isString(),
body("Eygptian").isBoolean(),
body("Arrival").isBoolean(),
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
        Arrival:req.body.Arrival,
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

      if (fs.existsSync("./upload/" + user[0].image_url)) {
        // File exists, proceed with deletion
        fs.unlinkSync("./upload/" + user[0].image_url);
      }
    
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


//search about result 
router.get("/searchstudent/:national_id", async (req, res) => {
  try {
    const national_id = req.params.national_id;

    const query = util.promisify(conn.query).bind(conn);

    // Search for the student in the status1 table
    const statusResult = await query(
      "SELECT name, building_number FROM status1 WHERE national_id = ?",
      [national_id]
    );

    if (statusResult.length > 0) {
      // If a match is found in status1, return name and building_number
      res.status(200).json({
        name: statusResult[0].name,
        building_number: statusResult[0].building_number
      });
    res.status(200).json(result);
    }
    else {
      res.status(404).json({
        msg: "Student information still processing "
       })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;

