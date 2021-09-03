const express=require('express')
const router=express.Router();
const path=require("path");
const multer=require("multer");
const mongodb=require("mongodb").MongoClient
const OBJ=require("mongodb").ObjectId


//addPost
var url;
var diskstorage=multer.diskStorage({
    destination:'./uploads/story',
    filename:(req,file,cb)=>{
        url=`${file.originalname}${Date.now()}${path.extname(file.originalname)}`;
return cb(null,`${file.originalname}${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:diskstorage})
 
router.post('/add',upload.single('file'),(req,res)=>{
  var data=JSON.parse(req.body.data)
  console.log(data)
var obj={
    postUrl:`http://localhost:3000/images/story/${url}`,
    userId:data.userId
}


mongodb.connect('mongodb://localhost:27017',(err,con)=>{
    if(err){console.log("falied to connect");res.json({message:'failed to connect'})}
else{
var dbName=con.db("instagram");
dbName.collection('story').insertOne(obj,(err,info)=>{
if(err){console.log("Failed to insert");res.json({message:'Oops something went wrong'})}
else{
    {console.log("Story Added ",info);res.json({message:'Story Added',data:info})}
}
})
}//first else
})//mongodb

})//route


//getstory
router.post('/get',(req,res)=>{
    mongodb.connect('mongodb://localhost:27017',(err,con)=>{
        if(err){console.log("falied to connect");res.json({message:'failed to connect'})}
else{
    var dbName=con.db("instagram");
    dbName.collection('story').find({userId:req.body.id}).toArray((err,info)=>{
        if(err){console.log("Failed to find");res.json({message:"Failed to find"})}
    else{
        console.log("find story ",info);
        res.json({message:"Story Find",data:info});
    }
    });
}//else
    })
})



module.exports=router;