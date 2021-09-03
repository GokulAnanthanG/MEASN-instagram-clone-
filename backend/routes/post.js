const express=require('express')
const router=express.Router();
const path=require("path");
const multer=require("multer");
const mongodb=require("mongodb").MongoClient
const OBJ=require("mongodb").ObjectId
//addPost
var url;
var diskstorage=multer.diskStorage({
    destination:'./uploads/post',
    filename:(req,file,cb)=>{
        url=`${file.originalname}${Date.now()}${path.extname(file.originalname)}`;
return cb(null,`${file.originalname}${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:diskstorage})
 
router.post('/addPost',upload.single('file'),(req,res)=>{
console.log(req.body.description);
 
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
newdate =day+ "/" + month +"/" + year
 
var obj={
    postUrl:`http://localhost:3000/images/post/${url}`,
    caption:JSON.parse(req.body.description),
    userid:JSON.parse(req.body.userid),
    date:newdate,
    addedTime:`${dateObj.getHours()}.${dateObj.getMinutes()}.${dateObj.getSeconds()}`,
    comment:[ ],
    likes:[ ],
}
console.log(obj)

mongodb.connect('mongodb://localhost:27017',(err,con)=>{
    if(err){console.log("falied to connect");res.json({message:'failed to connect'})}
else{
var dbName=con.db("instagram");
dbName.collection('post').insertOne(obj,(err,info)=>{
if(err){console.log("Failed to insert");res.json({message:'Oops something went wrong'})}
else{
    {console.log("posted ",info);res.json({message:'Posted',data:info})}
}
})
}//first else
})//mongodb

})//route


    //addStory
router.get('/AddStory',(req,res)=>{
    res.send("addStory")
})

//updateComment
router.post('/updateComment',(req,res)=>{
    console.log(req.body)
    mongodb.connect('mongodb://localhost:27017',(err,con) => {

if(err){console.log("failed to connect");res.json({message:"Failed to connect"})}
else{
var dbName=con.db("instagram");
var obj={
    comment:req.body.data
}
dbName.collection("post").updateOne({_id:OBJ(req.body.postId)},{$set:obj},(err,info)=>{
    if(err){
        console.log("Failed to update")
        res.json({message:"Failed To Update"})
    }
    else{
        res.json({message:"Updated",data:info})
console.log("Updated ",info)
    }//inner else
})
}//else

})
})


//updateLike
router.post('/updatelike',(req,res)=>{
    console.log(req.body)
    mongodb.connect('mongodb://localhost:27017',(err,con) => {

if(err){console.log("failed to connect");res.json({message:"Failed to connect"})}
else{
var dbName=con.db("instagram");
var obj={
    likes:req.body.data
}
dbName.collection("post").updateOne({_id:OBJ(req.body.postId)},{$set:obj},(err,info)=>{
    if(err){
        console.log("Failed to update")
        res.json({message:"Failed To Update"})
    }
    else{
        res.json({message:"Like added",data:info})
console.log("Updated ",info)
    }//inner else
})
}//else

})
})

//getASinglePost

router.post('/getPost',(req,res)=>{
    console.log("++",req.body.postId)
    mongodb.connect('mongodb://localhost:27017',(err,con)=>{
        if(err){console.log("falied to connect");res.json({message:'failed to connect'})}
        else{  
            var dbName=con.db("instagram");
        dbName.collection('post').findOne({_id:OBJ(req.body.postId)},(err,info)=>{
            if(err){console.log("failed to find");res.json({message:'Oops something went wrong'})}
            else{

               console.log("find ",info)
               res.json({message:"find",data:info});
            }   //else   
        })
        }//else  
})//mongodb
})//routergetAsinglePost

  //getPosts
  router.post('/getPosts',(req,res)=>{
      console.log(req.body.userId)
    mongodb.connect('mongodb://localhost:27017',(err,con)=>{
        if(err){console.log("falied to connect");res.json({message:'failed to connect'})}
        else{
        var dbName=con.db("instagram");
        let obj={
            _id:'60fadd04061cbb0dd90a1f94'
        }
        dbName.collection('post').find({userid:String(req.body.userId)}).sort({_id:-1}).toArray((err,info)=>{
            if(err){console.log("failed to find");res.json({message:'Oops something went wrong'})}
         else{

            console.log("find ",info)
            res.json({message:"find",data:info});
         }   //else
        })
        }//first else
})//router
  })


  //getPosts
  router.get('/getALLPosts',(req,res)=>{
    console.log(req.body.userId)
  mongodb.connect('mongodb://localhost:27017',(err,con)=>{
      if(err){console.log("falied to connect");res.json({message:'failed to connect'})}
      else{
      var dbName=con.db("instagram");
      let obj={
          _id:'60fadd04061cbb0dd90a1f94'
      }
      dbName.collection('post').find().sort({_id:-1}).toArray((err,info)=>{
          if(err){console.log("failed to find");res.json({message:'Oops something went wrong'})}
       else{

          console.log("find ",info)
          res.json({message:"find",data:info});
       }   //else
      })
      }//first else
})//router
})


  //getPostsOfFollowes
  router.post('/getPostsOfFollowers',(req,res)=>{
    var sendArray=[]//aray
      console.log("~~~~~~~~~~~~~~~~~~~~~~~");
   mongodb.connect('mongodb://localhost:27017',(err,con)=>{
      if(err){console.log("falied to connect");res.json({message:'failed to connect'})}
      else{
 /////////////getting data////////////////////////
var dbName=con.db("instagram");
 for(var i=0;i<req.body.followingArray.length;i++){
    dbName.collection("post").find({userid:req.body.followingArray[i].userId}).toArray((err,info)=>{
        for(var j=0;j<info.length;j++){
sendArray.push(info[j]);
        }//second for
    })
 }//first for
 /////////////////////////////////////
 console.log(sendArray);
 setTimeout(()=>{
     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
console.log("following feed data ",sendArray)
res.json({message:"following array feed",data:sendArray});
 },1000)
    }//else connection
})//mongodb
 })//router


 //delete post
 router.post('/deletePost',(req,res)=>{
    mongodb.connect('mongodb://localhost:27017',(err,con)=>{
        if(err){console.log("falied to connect");res.json({message:'failed to connect'})}
        else{
var dbName=con.db("instagram");
dbName.collection("post").deleteOne({_id:OBJ(req.body.id)},(err,info)=>{
    if(err){console.log("failed to delete");res.json({message:"Failed to delete"})}
    else{
       console.log("post deleted ",info);
       res.json({message:"Post Deleted",data:info});
    }
})
        }//else
 })//mongodb
 })//router

//savePostToUserSavesArray
router.post('/addSave',(req,res)=>{
    console.log("request ",req.body);
    mongodb.connect('mongodb://localhost:27017',(err,con)=>{
        if(err){console.log("falied to connect");res.json({message:'failed to connect'})}
        else{
var dbName=con.db("instagram");
dbName.collection("user").updateOne({_id:OBJ(req.body.data.userId)},{$set:{saves:req.body.data.ArrayData}},(err,info)=>{
if(err){console.log("Failed to insert");res.status(500).send("failed to insert")}
else{
    console.log("post saved ",info);
    res.json({message:"post saved",data:info});
}
})
        }//else
    })
})  
module.exports=router;