const express = require("express")
const app =express();
const userRouter = require("./routes/user.router")
const productRouter = require("./routes/product.router")
const cookieParser = require("cookie-parser");
const connectDb = require("./configs/db")
connectDb();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use("/api/v1/users",userRouter);
app.use("/api/v1/products",productRouter);

app.listen("8000",()=>{
    console.log("server running on port 8000");
})