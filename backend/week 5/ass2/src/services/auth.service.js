const jwt = require("jsonwebtoken")
require("dotenv").config()

function generateToken(user){
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    },process.env.JWT_SECRET)
    return token;
}

function verifyToken(token){
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded){
        return null;
    }else{
        return decoded;
    }
}

module.exports = {generateToken, verifyToken}