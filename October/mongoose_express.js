// Doing Mongoose with Express :- We can use Routes
// Doing it with Node :- We need to make them. 

const mongoose = require("mongoose");
const express = require("express");

//req.body
const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("Server Started");
});

// Connecting MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/employeeDB"); // Added database name
    console.log("Database Connected");
  } catch (error) {
    console.log("Database Connection Error:", error);
  }
};

// create schema

const userSchema = mongoose.Schema({
  // More customized
  name: {
    type: String,
    set: (v) => v.toUpperCase(), // Case sensitive, Uppercase & LowerCase are considered different things.
    require: true,
    unique: true, // It'll only work if you declare it in the starting the first time you are making it. If you give it after that it'll not work.
    minLength: [3, "Minimum 3 characters are required"], // 1st param : minimum requirement     2nd param :- error message
    maxLength: [15, "Maximum 15 characters can be filled"],
  },
  email: String,
  password: String,
  phone: Number,
  salary: {
    type: Number,
    min: [10000, "Min salary is 10000"], // Pre-defined validator functions
    validate: {
      // validate is a "property", validator is a "function"
      validator: (v) => v % 1000 === 0,
      message: "Salary must be a validator of 1000",
    }, // custom defined validator functions.
  },
});

// pre-middleware     Also,called Hooks
userSchema.pre("save", function(next) {
  console.log("Before Saving...");
  this.name = "abc" + this.name;        // "this" can't be used inside arrow function.
  this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
  next();
});

// post-middleware
userSchema.post("save", function(doc,next) {
  console.log("After Saving...");
  doc.password = "#" + doc.password;        
  next();
});

// model           // It's like "Object"    // Collection also get created by default with this name. IN PLURAL FORM.
const User = mongoose.model("User", userSchema);

connectDB();

app.post("/add-employee", async (req, res) => {
  try {
    const newUser = await User(req.body).save();
    res.status(201).json({
      status: "Success",
      user: newUser,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
});
