const { getUser } = require("../services/auth.service");



async function checkAuth(req,res,next) {
    const uid = req.cookies.uid;
    const userCheck = getUser(uid)
    if(!userCheck)
         res.status(400).json({status:"failed",message:"user not found!"});
    else {
        req.user = userCheck;
        next();
    }
}

module.exports = checkAuth