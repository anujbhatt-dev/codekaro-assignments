
const User = require("../models/user.model");
const { verifyToken } = require("../services/jwt.service");

const auth = async (req,res,next) => {
    try {
        const token = req.cookies?.token
        if(!token) return res.status(401).json({success:false,message:"unauthorised access!"})
        const decoded = verifyToken(token);
        if(!decoded) return res.status(401).json({success:false,message:"invalid or expired token!"})
        const user = await User.findById(decoded.id);
        if(!user) return res.status(401).json({success:false,message:"user does not exists!"})
        req.user = user
        next();
        
    } catch (error) {
        return res.status(401).json({success:false,message:"authentication failed!"})
    }
}

module.exports = auth
