const fs = require("fs")
const logger = (req,res,next) =>{
    const logText = `method: ${req.method} url: ${req.url} body: ${JSON.stringify(req.body)} \n`;
    fs.appendFile("log.txt",logText, ()=>{
        next();     
    });
}

module.exports = logger