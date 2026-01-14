const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({      // Schema
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true,
    },
    role:{
        type: String,
        enum:["student", "admin", "hod", "professor"],     // We have taken "enum" cause we know the roles
        default:"student"
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    department:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    }
},
{ timestamps: true}
)


// Now to create a model from the created Schema.
module.exports =  mongoose.model("uaasuser", userSchema); // Creating & exporting the model