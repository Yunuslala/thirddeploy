const express=require("express");
const userRouter=express.Router();
const bcrypt=require("bcrypt");
const jsonwebtoken=require("jsonwebtoken");
const {userModel}=require("../Models/user.model");
require('dotenv').config()
userRouter.post("/api/register",async(req,res)=>{
    try {
        let {name,email,password}=req.body;
        let checkEmail=await userModel.find({email});
        if(name==""||email==""||password==""){
            res.status(401).send({"msg":"provide all credentials"})
        }
        if(password.length<5){
            res.status(411).send({"msg":"provide strong password"})
        }
        if(checkEmail.length>0){
            res.status(402).send({"msg":"email has been already registered"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.status(404).send({"msg":err})
                }else{
                    const savedata= userModel({name,email,password:hash});
                    await savedata.save();
                    res.status(200).send({"msg":"you have been registered succesfully"})
                }
               
            })
        }
      
       
    } catch (error) {
        console.log("err",error);
        res.status(500).send({"msg":error})
    }
});

userRouter.post("/api/login",async(req,res)=>{
    try {
        let {email,password}=req.body;
        let findData=await userModel.find({email});

        bcrypt.compare(password,findData[0].password,(err,result)=>{
            if(err){
                res.status(401).send({"msg":"password is mismatched"})
            }else{
                const token=jsonwebtoken.sign({userid:findData[0]._id},process.env.secret)
                res.status(201).send({"msg":"login successfully",token})
            }
        })
    } catch (error) {
        console.log("err",error);
        res.status(500).send({"msg":error})
    }
});
module.exports={
    userRouter
}