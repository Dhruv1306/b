const express = require('express');
const app = express();

app.listen(3000, ()=> { console.log("1st server started")});
app.set("view engine", "ejs");

// const data = [                              // Here, data is an "Array of Objects". Therefore, we need to provide "index" while calling it. 
//     {userName: "Dhruv", isLoggedIn: true},
//     {userName: "Gautam", isLoggedIn: false}
// ]

const data = {userName: "Dhruv", isLoggedIn: true};

app.get('/', (req,res) => {
    res.render('greeting.ejs', {data});
});