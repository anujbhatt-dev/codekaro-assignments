const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req,res)=>{
    const {query,pathname} = url.parse(req.url,true);
    if(pathname === '/favicon.ico') return res.end();
    const log = `timestamp: ${Date.now()} | urlPath: ${req.url} | urlQuery: ${JSON.stringify(query)}\n`
    fs.appendFile("log.txt", log, ()=>{
        switch(pathname){
            case "/":
                res.end("welcome to Home Page!");
                break;
            case "/profile":
                res.end("welcome to Profile Page!");
                break;
            case "/search":
                res.end("welcome to Search Page!");
                break;
        }
    })
})

server.listen(8000,()=>{
    console.log("listening...");
    
})