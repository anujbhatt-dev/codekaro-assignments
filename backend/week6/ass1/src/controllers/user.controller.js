
const User = require("../models/user.model");
const { generateToken } = require("../services/jwt.service");

const registerUser = async (req, res) => {
    try {
        const {name,email,password} = req.body
        const newUser = await User.create({name,email,password})
        res.status(201).json({success:true,data:newUser})
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const {email,password} = req.body
        const user = await User.findOne({email,password}).select("name email")
        if(!user) 
            return res.status(400).json({success:false,message:"User not found!"})
        const token = generateToken(user);
        res.cookie("token",token)
        res.status(200).json({success:false,data:user})
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const logoutUser = async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({success:true,message:"Logout successfull!"})
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
