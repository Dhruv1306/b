const express = require('express');
const app = express();
app.listen(3000, () => { console.log("Server Started")});


// Import user routes

// const userRoutes = require(router);               // ❌ Invalid         
const userRoutes = require('./routes/users');       // ✅ Valid


// Mount at "/api/users"
app.use('/api/users', userRoutes);       // This line tells Express:-  "Take all the routes defined in "userRoutes", and prepend  "/api/users" to them."

app.get('/', (req,res) => { res.send("Hi Dhruv")});

// In Node.js, "require()" expects a STRING path to a module file, not a VARIABLE like "router". 