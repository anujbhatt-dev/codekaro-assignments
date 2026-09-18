const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

const details = {
    fullName:"",
    email:"",
    age:0,
    color:""
}

const PORT = 8000

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/form",(req,res)=>{
    res.render("form");
})

app.post("/submit",(req,res)=>{
    const {fullName,email,age,color} = req.body;
    details.fullName = fullName
    details.email = email
    details.age = age
    details.color = color
    res.redirect("/output")
})

app.get("/output",(req,res)=>{
    res.render("output",{...details});
})

app.listen(PORT,()=>{
    console.log(`app is running successfully on PORT: ${PORT}`);
})