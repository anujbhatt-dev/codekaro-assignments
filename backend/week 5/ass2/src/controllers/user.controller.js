const User = require("../models/user.model");
const { generateToken } = require("../services/auth.service");

async function registerUser(req,res){
    const {name,email,password,role} = req.body
    const newUser = await User.create({name,email,password,role})
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
    const token = generateToken(loggedInUser);
    res.cookie("token",token);
    res.status(201).json({status:"success",data:loggedInUser});
}



module.exports = {registerUser,getAllUser, login};