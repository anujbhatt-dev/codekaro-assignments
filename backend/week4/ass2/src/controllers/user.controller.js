const User = require("../models/user.model");

const createUser = async (req,res) =>{
    const {name,email} = req.body;
    const newUser = await User.create({
        name,email
    })
    res.status(201).json(newUser);
}

const getUserById = async (req,res) => {
    const {id} = req.params
    const user = await User.findById(id);
    res.status(200).json(user);
}

const getUserByIdAndDelete = async (req,res) => {
    const {id} = req.params
    await User.findByIdAndDelete(id);
    res.status(200).json({success:true});
}

const getUserByIdAndUpdate = async (req,res) => {
    const {id} = req.params
    await User.findByIdAndUpdate(id, {...req.body});
    res.status(200).json({success:true});
}

module.exports = {createUser,getUserById,getUserByIdAndDelete,getUserByIdAndUpdate}