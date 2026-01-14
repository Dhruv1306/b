const express = require('express');
const app = express();
app.listen(3000, () => { console.log("2nd server started")});
app.set("view engine", "ejs");

app.get('/', (req,res) => {
    res.render('main.ejs');       // sending a "data" object isn't a necessary thing.
});