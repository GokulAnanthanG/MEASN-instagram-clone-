const express = require('express')
const router = express.Router();
const mongoDb = require("mongodb").MongoClient;

router.post('/add', (req, res) => {
    console.log(req.body.data);
    mongoDb.connect('mongodb://localhost:27017', (err, con) => {
        if (err) {
            console.log("failed connect");
        }
        else {
            var dbName = con.db("instagram");
            dbName.collection('chat').insertOne(req.body.data, (err, info) => {
                if (err) { console.log("can't add chat") }
                else {
                    console.log("chat added ", info)
                    res.json({ message: "chat added", data: info });
                }
            })
        }
    })//mongodb
})
//getChat

router.post('/getChatt',(req,res)=>{
    mongoDb.connect('mongodb://localhost:27017', (err, con) => {
        if (err) {
            console.log("failed connect");
        }
        else {
            var dbName=con.db("instagram");
            dbName.collection("chat").find({$or:[{chatter1:req.body.chatter1,chatter2:req.body.chatter2},{chatter1:req.body.chatter2,chatter2:req.body.chatter1}]}).toArray((err,info)=>{
                if(err){
                    console.log("Failed to find"); res.json({message:"Failed to find"});
                }
                else{
                    console.log("find ",info); res.json({message:"find",data:info}); 
                }
            })
        }//else
    });//mongodb

})

module.exports = router;