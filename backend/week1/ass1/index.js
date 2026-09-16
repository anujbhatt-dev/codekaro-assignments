const fs = require("fs")
fs.writeFile("data.txt", "this is a first file", (err)=>{
    if(err) console.log("err ", err);
    else console.log("done");
})