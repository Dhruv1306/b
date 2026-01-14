const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));

//importing the model from todo.js
const Todo = require("./models/ToDo");

//mongodb connection
mongoose.connect("mongodb://localhost:27017/todoList")
.then(()=> console.log("Mongo Connected ✅"))
.catch((err) => console.log(err))

//Routes
app.get("/", async(req,res)=>{
    const todos = await Todo.find();
    res.render("index",{todos});
})

app.post("/add", async(req,res)=>{
    const task = req.body.task;
    await Todo.create({task})

    res.redirect("/");
})

app.listen(3000,()=>{
    console.log("Server at http://localhost:3000");
})