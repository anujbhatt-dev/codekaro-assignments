const express = require("express")
const app = express()
require("./config/db")
const ProductRouter = require("./routes/product.route")
app.use(express.json())
app.use("/products", ProductRouter);

app.listen(8000,()=>{
    console.log("app running on port 8000");
})