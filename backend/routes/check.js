const express = require('express');
const { async } = require('rxjs');
const router = express.Router();
const jwt=require("../helpers/jwt")
router.post('/',async (req, res) => {
    
    var result = await jwt.tokenValidator(req.body.token);
    console.log("token Status ",result)
res.json({message:"token result",result:result});
})

module.exports=router;