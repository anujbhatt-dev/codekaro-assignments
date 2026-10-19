const express = require("express");
const connectDB = require("./config/db");
const app = express();
connectDB()
const userRouter = require("./routes/user.route");
const logger = require("./middlewares/logger.middleware");


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(logger);

app.use("/api/v1/users", userRouter);

app.listen("8000",()=>{
    console.log("app running on port 8000");
})