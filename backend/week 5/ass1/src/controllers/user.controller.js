const User = require("../models/user.model");
const {v4:uuidv4} = require("uuid");
const { setUser } = require("../services/auth.service");

async function registerUser(req,res){
    const {name,email,password} = req.body
    const newUser = await User.create({name,email,password})
    res.status(201).json({status:"success",data:newUser})
}

async function getAllUser(req,res){
    const allUsers = await User.find({})
    res.status(201).json({status:"success",data:allUsers})
}

async function login(req,res){
    const {email,password} = req.body
    const loggedInUser = await User.findOne({email,password})
    if(!loggedInUser) res.status(400).json({status:"fail",message:"user not found"})
    const uid = uuidv4();
    res.cookie("uid",uid);
    setUser(uid,loggedInUser);
    res.status(201).json({status:"success",data:loggedInUser});
}



module.exports = {registerUser,getAllUser, login};