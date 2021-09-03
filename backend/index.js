const express=require("express");
const cors=require("cors")
const bodyparser=require("body-parser")
//
const user=require("./routes/user");
const post=require("./routes/post");
const userDetail=require('./routes/getUserdetail');
const login=require("./routes/login");
const check=require("./routes/check");
const chat=require("./routes/addChat");
 const addStory=require("./routes/addStory");

//
const app=express();
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use('/images',express.static('uploads'));
//
app.get('/',(req,res)=>{
    res.json("hello from server")
})
//
app.use('/user',user);
app.use('/post',post);
app.use('/getUserDetail',userDetail)
app.use('/login',login);
app.use('/check',check);
app.use('/chat',chat);
app.use('/story',addStory);


//
app.listen(3000,(err,res)=>{
    console.log("server running on port 3000...")
})
