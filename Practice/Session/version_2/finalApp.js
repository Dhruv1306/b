const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');
const path = require('path');
app.listen(3000, '0.0.0.0', () => { console.log("Server Started")});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'version_2')));
app.use(session({
    secret: "KEY",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 1  // 1 min
    }
}));
app.use((req,res,next) => {
    console.log("Setting res.locals.VISA:", req.session.user);
    res.locals.VISA = req.session.user;
    next();
})

const isAuthenticated = (req,res,next) => {           // Who       
    const VISA = res.locals.VISA;
    // console.log("Session user: ", VISA);
    if(VISA) return next();
    return res.redirect('/login?expired=true');    // Passing "expired" as a QUERY PARAMETER
} ;

const isAuthorized = (req,res,next) => {             // What
    const VISA = res.locals.VISA;
    const RouteRole = req.params.role;
    const username = VISA.username;
    const RouteUsername = req.params.name;
    if(VISA.role != RouteRole) return res.status(401).send(`You are not authorized to access ${RouteRole} resources.`);
    if(username != RouteUsername) return res.status(401).send(`You are not authorized to access ${RouteRole}, ${RouteUsername}'s resources.`);
    if(VISA) return next();
};

app.get('/', (req,res)=> { res.status(200).send("Hii Everyone!! It's The Final App.js")});

app.get('/registration', (req,res)=> { res.status(200).sendFile('./src/UI/user/registration.html', {root: __dirname})});

app.post('/registration', (req, res)=> {
    const userData = req.body;
    userData.isAdmin = false;
    const users = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'));
    users.push(userData);
    fs.writeFileSync('./src/data/users.json', JSON.stringify(users, null, 4));
    res.redirect('/login');
})

app.get('/login', (req,res) => { 
    const expired = req.query.expired === 'true'; 
    const message = expired ? 'Session expired. Please log in again' : '';   // Always remember that we can't pass variables directly to static HTML. ( In this case, the message & expired variables.)
    res.status(200).sendFile('./src/UI/login.html', {root: __dirname})
});

app.post('/login', (req,res) => {
const bodyData = req.body;
const users = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'));
const user = users.find(u => u.email === bodyData.email);
if(!user) return res.status(404).send("User not found");
if(user.password != bodyData.password) return res.status(401).send("Password is incorrect");
req.session.user = {...user, role: user.isAdmin ? 'admin' : 'user'};
// console.log('User Object:', user);
return (user.isAdmin) ? res.redirect(`/dashboard/admin/${user.username}`) : res.redirect(`/dashboard/user/${user.username}`);   // Here, I am passing these like a "path parameter"(params), as I am just passing the Value only. Not like a "query parameter"(query) in which we pass both Key & Value.
// return (user.isAdmin) ? res.redirect(`/dashboard/admin?name=${user.username}`) : res.redirect(`/dashboard/user?name=${user.username}`);   // Here, it's Passing as a QUERY
})

// Route, working for PATH PARAMETER (params)
app.get('/dashboard/:role/:name', isAuthenticated, isAuthorized, (req,res) => {
    const Role = req.params.role;
    res.status(200).sendFile(`./src/UI/${Role}/dashboard.html`, {root: __dirname});
})


//Route, working for QUERY Parameter (query)
// app.get('/dashboard/:role', isAuthenticated, isAuthorized, (req, res) => {
//   const Role = req.params.role;
//   const userName = req.query.name; // ✅ Extracted from query string
//   res.status(200).sendFile(`./src/UI/${Role}/dashboard.html`, { root: __dirname });
// });