const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const userRoute = require("./routes/user.route");
const expenseRoute = require("./routes/expense.route");
const connectDb = require("./config/db");
const auth = require("./middlewares/auth.middleware");
connectDb();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users",userRoute)
app.use("/api/v1/expenses",auth ,expenseRoute)



app.listen("8000",()=>{
    console.log("app running on port 8000");
})