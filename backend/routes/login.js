const express=require("express");
const route=express.Router();
const mongoDb=require("mongodb").MongoClient;
const jwt=require("../helpers/jwt")
route.post('/',(req,res)=>{
    console.log(req.body);
   mongoDb.connect("mongodb://localhost:27017",(err,con)=>{
       if(err){console.log("Failed to connent");res.json({message:"Failed To Connect"})}
       else{
           var dbName=con.db("instagram");
           dbName.collection("user").findOne({email:String(req.body.userName),password:String(req.body.password)},(err,info)=>{
               if(err){console.log("Unable to find");res.json({message:"Unable to find"})}
               else{console.log("find ",info);
               if(info){
res.json({message:"find",data:info,token:jwt.genToken(info._id)});
               }
               if(info==undefined){
                console.log("invalid")
                res.status(500).json({message:"Invalid"});
               }
               //for info
            }//else
           })
       }//else
   })
})


module.exports=route;