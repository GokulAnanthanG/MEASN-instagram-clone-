const express = require('express')
const router = express.Router();
const mongoDb = require("mongodb").MongoClient;
const OBJ=require("mongodb").ObjectId

router.post('/', (req, res)=>{
   console.log("user detail")
    console.log(req.body.id+"@@@@@@@@@@@@@@")
   mongoDb.connect('mongodb://localhost:27017',(err,con) => {
if(err){console.log("Failed to connect");res.json({message:'failed to connect'})}
else{
var dbName=con.db("instagram");
dbName.collection('user').findOne({_id:OBJ(req.body.id)},{password:0,confirmPassword:0},(err,info)=>{
   if(err){console.log("Failed to connect");res.json({message:'Failed to find'})}
   else{
console.log("Find ",info);
res.json({message:"find",data:info})
   }//inner else
})
}//else
})//mongo

      
})//router




module.exports = router