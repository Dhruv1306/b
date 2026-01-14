const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");
app.listen(3000, () => { console.log("Server Started")});

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "BEE")));

app.get('/login', (req,res) => { res.sendFile("./login.html", {root : __dirname})});

app.post('/login', (req,res) => {
    const bodyData = req.body;
    const users = JSON.parse(fs.readFileSync("./user.json", "utf-8"));
    const user = users.find(user => user.username === bodyData.username);
    if(!user) return res.send("No user found");
    if(user.password != bodyData.password) return res.send("Password is wrong");
    if (user.role == "admin") return res.redirect('/dashboard/admin');
    else return res.redirect('/dashboard/user');
})

app.get('/dashboard/:role', (req,res) => {
    const role = req.params.role;
    res.sendFile(`./${role}/Dashboard.html`, {root: __dirname});
})