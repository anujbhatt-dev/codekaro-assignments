const http = require("http");
const fs = require("fs")

const getRandomNumber = () => Math.floor(Math.random()*10);

const getTime = () => new Date().toISOString()

const server = http.createServer((req,res)=>{
    setTimeout(() => {
        const num = getRandomNumber();
        const ip = req.socket.remoteAddress;
        fs.appendFile("server.log", `RANDOM_REQUEST_TIME: ${getTime()} RANDOM_REQUEST_URL: ${req.url} RANDOM_REQUEST_IP: ${ip} \n`,()=>{
            console.log("Log Added"); 
        })
        res.end(`
            <script>
                setTimeout(() => location.reload(), 2000);
            </script>
            RANDOM NUMBER: ${num}
        `);
    }, 2000);
})

server.listen(8000,()=>{
    console.log("listening on 8000");
    fs.appendFile("server.log", `SERVER_START_TIME: ${getTime()}\n`, ()=>{
        console.log("Log Added");
    })
})