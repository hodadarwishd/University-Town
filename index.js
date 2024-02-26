//############# intialize express ###################
const express=require("express");
const app=express();

//################ global middleware ################
app.use(express.json());  //it help me while i erite body in postman it can access it 
app.use(express.urlencoded({ extended:true})); //to acess url form encoded
app.use(express.static('upload')); //to can access folder upload and all photos and videoes in it
const cors=require("cors");
app.use(cors());  //allow HTTP requests local hosts

//################# reqired module #############

const student=require("./routes/Student");
const employee=require("./routes/Employee");
const admin=require("./routes/Admin");
const governorate=require("./routes/Governorate");
const colleges=require("./routes/Colleges");
app.use(express.static('upload')); //to can access folder upload and all photos and videoes in it

//################# run the app #############

app.listen(4000,"localhost",()=>{     //4000 is port number
console.log("server is running");
});

//############### Api Routes  [endpoints] #####################3
app.use("/student",student);
app.use("/employee",employee);
app.use("/admin",admin);
app.use("/governorate",governorate);
app.use("/colleges",colleges);
