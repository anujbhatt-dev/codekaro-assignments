const { verifyToken } = require("../services/auth.service");



async function checkAuth(req,res,next) {
    const token = req.cookies.token;
    const userCheck = verifyToken(token);
    if(!userCheck)
         res.status(400).json({status:"failed",message:"user not found!"});
    else if(userCheck.role!=="Admin"){
        res.status(400).json({status:"failed",message:"Only Admins are allowed to perform such task!"});
    }else{
        req.user = userCheck;
        next();
    }
}

module.exports = checkAuth