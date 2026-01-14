const express = require('express');
const app = express();
app.listen(3000, () => { console.log("Practice_ejs's Server Started")});

app.set("view engine", "ejs");

app.get('/', (req,res) => {
    res.render("index.ejs", {name: "Dhruv"});
});