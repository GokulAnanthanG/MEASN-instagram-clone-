const express=require("express");
const route=express.Router();
const jwt=require("jsonwebtoken");
 

const genToken=(id)=>{
    const token=jwt.sign({id},"skeyInstauserid009")
    return token;
}

const validateToken=async(token)=>{
    try{
       var result= jwt.verify(token,'skeyInstauserid009');
        return true;
    }
    catch(erro){
return false;
    }
}

module.exports={
    genToken:genToken,
    tokenValidator:validateToken
}