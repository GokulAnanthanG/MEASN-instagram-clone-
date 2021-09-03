const express = require('express')
const router = express.Router();
const path = require("path");
const multer = require("multer");
const mongoDb = require("mongodb").MongoClient
const OBJ = require("mongodb").ObjectId
const jwt = require("../helpers/jwt");
const { send } = require('process');
//register
router.post('/register', (req, res) => {
    console.log(req.body.data)
    mongoDb.connect('mongodb://localhost:27017', (err, con) => {

        if (err) { console.log("Failed To Connect ", err) }
        else {
            var dbName = con.db("instagram")
            var obj = {
                ...req.body,
                following: [],
                followers: [],
                saves:[],
                imgurl: '',
                websiteUrl: '',
                bio: '',
                gender: '',
                accountSatus: 'public'
            }
            dbName.collection('user').insertOne(obj, (err, info) => {
                if (err) {
                    res.status(500).json({ message: "Failed To Insert" })
                }
                else {
                    res.json({ message: "Registered", data: info, toke: jwt.genToken(info.insertedId) })
                }//inner else
            })

        }//else
    })//mongo

})//rote

//updateUser
var url;
var diskstorage = multer.diskStorage({
    destination: './uploads/profilePicture',
    filename: (req, file, cb) => {
        url = `${file.originalname}${Date.now()}${path.extname(file.originalname)}`;
        return cb(null, `${file.originalname}${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: diskstorage })
router.post('/updateUser', upload.single('file'), (req, res) => {
    var data = JSON.parse(req.body.data)
    console.log(data.userName)
    console.log(data.phoneNo)
    console.log(data.email)
    console.log(data.website)
    console.log(data.bio)
    console.log(data.gender)
    console.log(data.image)

    var obj = {
        userName: data.userName,
        phoneNo: data.phoneNo,
        email: data.email,
        websiteUrl: data.website,
        bio: data.bio,
        gender: data.gender,
    }
    console.log(obj)

    if (data.image) {
        obj.imgurl = `http://localhost:3000/images/profilePicture/${url}`
    }
    else {

    }

    mongoDb.connect('mongodb://localhost:27017', (err, con) => {

        if (err) { console.log("failed to connect"); res.json({ message: "Failed to connect" }) }
        else {
            var dbName = con.db("instagram");
            dbName.collection("user").updateOne({ _id: OBJ(data.userId) }, { $set: obj }, (err, info) => {
                if (err) {
                    console.log("Failed to update")
                    res.json({ message: "Failed To Update" })
                }
                else {
                    res.json({ message: "Updated", data: info })
                    console.log("Updated ", info)
                }//inner else
            })
        }//else

    })


})//route



//getusersFor suggest
router.get('/getUsers', (req, res) => {
    //  6103a7d03c634485304a9b3b
    mongoDb.connect('mongodb://localhost:27017', (err, con) => {
        if (err) { console.log("Failed to connect"); res.json({ message: "Failed to connect" }) }
        else {

            var db = con.db("instagram");
            db.collection("user").find().limit(30).toArray((err, info) => {
                if (err) { console.log("Failed to find") }
                else {
                    res.json({ message: "find", data: info });
                    console.log(info)
                }//else
            })
        }
    });//mongodb

})//router

//updatefollowing
router.post('/updateFolloing', (req, res) => {
    console.log(req.body)
    mongoDb.connect('mongodb://localhost:27017', (err, con) => {

        if (err) { console.log("failed to connect"); res.json({ message: "Failed to connect" }) }
        else {
            var dbName = con.db("instagram");
            var obj = {
                following: req.body.data
            }
            dbName.collection("user").updateOne({ _id: OBJ(req.body.id) }, { $set: obj }, (err, info) => {
                if (err) {
                    console.log("Failed to update")
                    res.json({ message: "Failed To Update" })
                }
                else {
                    res.json({ message: "Updated", data: info })
                    console.log("Updated ", info)
                }//inner else
            })
        }//else

    })
})

///

//updatefollowers
router.post('/updateFollowers', (req, res) => {
    console.log(req.body)
    mongoDb.connect('mongodb://localhost:27017', (err, con) => {

        if (err) { console.log("failed to connect"); res.json({ message: "Failed to connect" }) }
        else {
            var dbName = con.db("instagram");
            var obj = {
                followers: req.body.data
            }
            dbName.collection("user").updateOne({ _id: OBJ(req.body.id) }, { $set: obj }, (err, info) => {
                if (err) {
                    console.log("Failed to update")
                    res.json({ message: "Failed To Update" })
                }
                else {
                    res.json({ message: "Updated", data: info })
                    console.log("Updated ", info)
                }//inner else
            })
        }//else

    })
})

//getUserWithName
router.post('/getUserWithName', (req, res) => {
    console.log("user detail")
    mongoDb.connect('mongodb://localhost:27017', (err, con) => {
        if (err) { console.log("Failed to connect"); res.json({ message: 'failed to connect' }) }
        else {
            var dbName = con.db("instagram");
            var searchFor = req.body.name
            try{
                dbName.collection("user").find({ userName: new RegExp(req.body.name) }).toArray((err, info) => {
                    if (err) { console.log("Failed to find"); res.json({ message: 'failed to find' }) }
                    else {
                        console.log('find ', info);
                        res.json({ message: "find", data: info })
                    }
                })
            }//try
            catch(err){
                res.json({ message: "Invalid searc"}) 
                console.log("invalid search ",err)
            }
        }//else
    })//mongo
})//router


//getuserWithfollowingarray

router.post('/getStoryUser', (req, res) => {
   var sendStoryUserArray=[];
    console.log("user detail")
    mongoDb.connect('mongodb://localhost:27017', (err, con) => {
        if (err) { console.log("Failed to connect"); res.json({ message: 'failed to connect' }) }
        else {
        
var dbName=con.db("instagram");
req.body.followingArray.forEach(e => {
    dbName.collection("story").findOne({userId: e.userId},(err,info)=>{
        if(err){console.log("Unable to find ");res.send("failed to find")}
        else{
            sendStoryUserArray.push(info)
        }
    }) 
     
   
});//for each
setTimeout(()=>{
    console.log("ooooooooo STORY oooooooo",sendStoryUserArray);
    res.send({message:"Status Data Find",data:sendStoryUserArray})    
},3000)
}//else
    })//mongodb
})//router

module.exports = router