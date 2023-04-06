const express = require('express');
const {UserModel} = require('../Models/User.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const UserRouterSignup = express.Router();
const UserRouterLogin = express.Router();

//----------------------------   signup  ---------------------------------------//
UserRouterSignup.post("/", async(req,res)=>{
    const {email, password} = req.body;
    try {
        bcrypt.hash(password, 5, async(err, secure_pass)=> {
            if(err){
         res.send({"msg":"Please Enter Strong Password"});
            }
            else{
         const user = new UserModel({email,password:secure_pass});
         await user.save()
         res.send({"msg":"User Registered Successfully"});
            }
        });
    } catch (error) {
        res.send({"msg":error.message});
    }
})
//----------------------------   Login  ---------------------------------------//
UserRouterLogin.post("/", async(req,res)=>{
    const {email, password} = req.body;
    try {
       const user  = await UserModel.find({email});
       if(user.length>0){
        bcrypt.compare(password, user[0].password, (err, result)=>{
            if(result){
                const token = jwt.sign({ userID: user[0]._id}, 'harsh');
                res.send({"msg":"Login Successful",token});
            }
            else{
                res.send({"msg":"Invalid Password"});
            }
        });
       }
       else{
        res.send({"msg":"Invalid Credentials"});
       }
    } catch (error) {
        res.send({"msg":error.message});
    }
})


module.exports  = {UserRouterSignup,UserRouterLogin}