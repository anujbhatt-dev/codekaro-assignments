const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("./db.js")

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

const TodoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
})

const Todo = mongoose.model("todo", TodoSchema);

app.get("/",async (req,res)=>{
    const todos = await Todo.find()
    res.render("index", {todos})
})

app.post("/todo", async (req,res)=>{
    const {title} = req.body
    await Todo.create({
        title
    })
    res.redirect("/");
})

app.post("/todo/:id", async (req,res) =>{
    const todo = await Todo.findById(req.params.id);
    if(todo){
        todo.isCompleted = !todo.isCompleted
        await todo.save();
    }
    res.redirect("/");
})

app.post("/todo/:id/delete", async (req,res) =>{
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect("/");
})



app.listen("8000",()=>{
    console.log("App running on port 8000");
})
