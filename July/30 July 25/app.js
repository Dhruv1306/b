const express = require('express');
const session = require('express-session');

const app = express();
app.listen(3000, () =>
{
    console.log("server started")
})
const users = [
    { username: "abc", pass: "123", role: "admin" },
    { username: "xyz", pass: "456", role: "user" },
    { username: "def", pass: "789", role: "guest" }
];

app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: "class5",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}))

const isAuthenticated = (req, res, next) =>      // Who     // It can work alone
{
    // console.log(userSession)
    if (req.session.user)
    {
        return next();
    }

    return res.redirect('/login')
}

const isAuthorized = (req, res, next) =>         // What  ( what are the things that are accessible ) // It cannot work without Authentication
{
    if (req.session.user && req.session.user.role == 'admin')
    {
        return next();
    }
    res.send("You are not allowed to access admin resource");
}


app.get('/admin/dashboard', isAuthenticated, isAuthorized, (req, res) =>
{
    // console.log(userSession)
    res.sendFile("/dashboard.html", { root: "./admin" })
})

app.get('/user/dashboard', isAuthenticated, (req, res) =>
{
    res.sendFile("/dashboard.html", { root: "./user" })
})

app.get('/', (req,res) => { res.send("Demo")});

app.get('/login', (req, res) =>
{
    res.sendFile('/login.html', { root: '.' });
})

app.post('/login', (req, res) =>
{
    const userObject = req.body;

    const user = users.find(user => user.username == userObject.username)

    if (!user)
    {
        return res.send("invalid username")
    }

    if (user.pass != userObject.password)
    {
        return res.send('invalid password')
    }

    req.session.user = user;
    // console.log(userSessionreq)

    if (user.role == "admin")
    {
        return res.redirect('/admin/dashboard?username=' + user.username)
    }

    res.redirect('/user/dashboard?username=' + user.username)

})


app.get('/logout', (req, res) =>
{
    req.session.destroy();
    res.redirect('/login')
})