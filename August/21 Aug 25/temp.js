const express = require('express');
const session = require('express-session');
const app = express();

const {
    PORT = 3000,
    SESSION_name = 'Sid',
    SESSION_secret = 'KEY',
    SESSION_maxAge = 1000 * 60 * 60 * 1,
} = process.env;

app.listen(PORT, ()=> { console.log(`Server running at http://localhost:${PORT}`)});

app.use(express.urlencoded({extended: true}));
app.use(session({
    name: SESSION_name,
    secret: SESSION_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: SESSION_maxAge
    }
}));

app.get('/', (req,res) => {
    const userID = 1;
res.send(
    `<h1>Welcome!</h1>
    ${userID ?
        `<a href = '/home'>Home</a> <br><br>
        <form action = '/logout' method = 'POST'> 
        <button>Log Out</button>
        </form>` : 
        `<a href = '/login'>Login</a> <br><br>
        <a href = '/registration'>Register</a> <br><br> `
    } 
    `)
});

app.get('/home', (req,res) => {

});
app.get('/login', (req,res) => {

});
app.get('/registration', (req,res) => {

});
app.post('/login', (req,res) => {

});
app.post('/registration', (req,res) => {

});
app.post('/logout', (req,res) => {

});