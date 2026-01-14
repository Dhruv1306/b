const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const session = require('express-session');
app.listen(3000, () => { console.log("Temp Server Started")});

app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json());
app.use(session({
    secret : "Key",
    resave : false,
    saveUninitialized : false,
    cookie : {
        secure : false,
        maxAge : 1000 * 60 * 2   // 2 min
    }
}))

const isAuthenticated = (req,res, next) => {
    if(req.session.user){ return next(); }
    return res.redirect('/login');
}

const isAuthorized = (req,res,next) => {
    const loggedInUser = req.session.user;
    const routeRole = req.params.role;
    if(loggedInUser && loggedInUser.role == routeRole){
        return next();
    }
    res.status(403).send(`you are not allowed to access ${routeRole} resources.`);
}

app.get('/', (req,res) => { res.send("Home Page")});

app.get('/login', (req,res) => {
    res.sendFile("./UI/login.html", {root: __dirname});
})

app.get('/registration', (req,res) => { res.sendFile("./UI/user/registration.html", {root: __dirname})});

app.post('/registration', (req,res) => {
    const userData = req.body;
    userData.isAdmin = false;
    const users = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"));
    users.push(userData);
    fs.writeFileSync("./data/user.json", JSON.stringify(users,null,4));
    res.redirect('/login');
});

app.post('/login', (req,res) => {
    const bodyData = req.body;
    const users = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"));
    const user = users.find(user => user.email === bodyData.email);
    if(!user) return res.send("User doesn't exist");
    if(user.password != bodyData.password) return res.send("Wrong Password");
    // req.session.user = user;
    req.session.user = {
        ...user,
        role: user.isAdmin ? 'admin' : 'user'
    }
    // console.log(req.session);

    return (user.isAdmin) ? res.redirect('/dashboard/admin') : res.redirect('/dashboard/user');
})

app.get('/dashboard/:role', isAuthenticated, isAuthorized, (req,res) => {
    const role = req.params.role;
    res.sendFile(`./UI/${role}/dashboard.html`, {root: __dirname});
})

app.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/login');
})