const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const app = express();
const utils = require('../../utils');
// console.log(utils);    //     It will give you a check of what's inside your utils object after importing it.
// OR
console.log(Object.keys(utils)); // Just the names of exported properties

const {
    PORT = 3000,
    SESSION_name = 'sid',
    SESSION_secret = 'Key',
    SESSION_maxAge = 1000 * 60 * 2   // 2 min
} = process.env;


app.listen(PORT, () => { console.log(`Server is running at http://localhost:${PORT}`)});
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'BEE')));
app.use(session({
    name : SESSION_name,
    secret : SESSION_secret,
    resave : false,
    saveUninitialized : false,
    cookie : {
        secure : false,
        maxAge : SESSION_maxAge,
    }
}));


app.get('/', (req,res) => {res.send("<h1>Welcome to the Home Page of 1.js!!</h1>")});

app.get('/login', (req,res) => { res.send(utils.loginHTML)});

app.get('/registration', (req,res) => { res.sendFile(utils.registrationPath)});

app.post('/login', (req,res) => {
    const bodyData = req.body;
    const users = utils.Users;
    // console.log(users);
    const user = users.find( user => user.email === bodyData.email);
    if (!user) return res.send("<h2>User Not Found</h2>");
    else if (user.password != bodyData.password) return res.send("<h2>Password is Incorrect</h2>");
    else return (user.isAdmin) ?  res.redirect(`/dashboard/admin/${user.username}`) : res.redirect(`/dashboard/user/${user.username}`);
});

app.get('/dashboard/:role/:name', (req,res) => {
    const Role = req.params.role;
    const name = req.params.name; 
    return (Role === "admin") ? res.send(utils.adminDashboardHTML) : res.send(utils.userDashboardHTML);
});