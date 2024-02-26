const mysql=require ("mysql");
const connection= mysql.createConnection({
host:"localhost",
user:"root",
password:"",
database:"university-town",
port:"3306"

})
connection.connect((err)=>{
    if(err) throw err;
    console.log("DBconnect ");
});
module.exports=connection;
