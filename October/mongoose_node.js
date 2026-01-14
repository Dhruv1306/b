// npm i mongoose

const mongoose = require("mongoose");
const express = require("express");

// Connecting Mongoose
const connectDB = async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/")        // Name of the database is given here :- ("mongodb://localhost:27017/mySectionG")
                .then(() => console.log("Database Connected"))
                .catch((err) => console.log("Mongo Error : ", err));  // It'll give us the error from MongoDB
    } catch(error) {        // This will handle the error of our code
        console.log(error);
    }
} 

// Schema    // Creating Schema for user    // It's like "Class"

// const userSchema = mongoose.Schema({    // Basic
//     name : String,
//     email : String,
//     password : String,
//     phone : Number,
//     salary : Number,
// })

const userSchema = mongoose.Schema({   // More customized
    name : {
        type : String,
        set : (v) => v.toUpperCase(),    // Case sensitive, Uppercase & LowerCase are considered different things. 
        require : true,
        unique : true,  // It'll only work if you declare it in the starting the first time you are making it. If you give it after that it'll not work.
        minLength : [3, "Minimum 3 characters are required"],   // 1st param : minimum requirement     2nd param :- error message
        maxLength : [15, "Maximum 15 characters can be filled"]
    },
    email : String,
    password : String,
    phone : Number,
    salary : {
        type : Number, 
        min : [10000, "Min salary is 10000"],       // Pre-defined validator functions
        validate : {     // validate is a "property", validator is a "function"
            validator : (v) => v % 1000 === 0,
            message : "Salary must be a validator of 1000"
        }  // custom defined validator functions.
    }
})


// model           // It's like "Object"    // Collection also get created by default with this name. IN PLURAL FORM.
const User = mongoose.model("User", userSchema)  // First give name of the model. Now wherever we want to do CRUD Operation we can do using it. The 2nd one is "On which Schema we have to do it".

//Functions for CRUD Operations

const createUser = async() => {
    const newUser = new User({        // here we'll pass our "req.body" things
        name : "Dhruv",
        email : "d@gmail.com",
        password : "d@123",
        phone : 1234567890,
        salary : 200000
    })

    // Now saving this above data
    const savedUser = await newUser.save();
    console.log(savedUser);
}


// Now run the functions
connectDB();
createUser();

/* NOTE :- By Default it stores data in a "temp" named Database.
           And all collections name will always be in small letters. 
*/