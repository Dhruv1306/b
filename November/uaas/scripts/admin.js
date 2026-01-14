const mongoose = require("mongoose");
const userModel = require("../models/userModel");

mongoose
.connect(process.env.MONGO_URI || "mongodb://localhost:27017/UAAS_DB")  // Taken from the ".env" file.
.then(() => console.log("MongoDB Connected"))
.catch((err)=>console.log(err))

//an async function
async function addAdminCred(){
    try{
        bcrypt.genSalt()  // Salt - value, will define how much 
        const admin = await userModel.create({         // create() automatically saves and returns the document.
            email:"admin@gmail.com",
            password:"admin123",
            role: "admin",
            firstName:"admin",
        });
        console.log(admin);
        console.log("Admin added");
    } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

addAdminCred();

// run iit with:  node ./admin.js