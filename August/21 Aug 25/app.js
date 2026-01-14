// Session based Authentication                          

// We'll run our script using "npm run dev" (see "package.json")

const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

let data = {}
// Making Variables
app.use((req,res,next) => {
    data = req.session.user;
    next();
})
const {
    
    PORT = 3000,
    SESSION_name = 'Sid',
    SESSION_secret = 'KEY',                  // It's for JWT, BUT we can use it in Session also.
    SESSION_maxAge = 1000 * 60 * 60 * 1,     // 1 hr
    DATA = data
} = process.env     // It's like creating A GLOBAL OBJECT & NOW, we can access this object anywhere in our WORK ENVIRONMENT, i.e, "21 Aug 25". 
// "process.env", It's a special object provided by Node.js.

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));


// Middlewares
// app.use(express.urlencoded({extended: true}));       // It sometime MAY NOT WORK 
app.use(bodyParser.urlencoded({extended: true}));      // It will guarenty to work all the time.
app.use(express.static(path.join(__dirname, '21 Aug 25')));
app.use(session({
    name : SESSION_name,
    secret : SESSION_secret,
    resave : false,                
    saveUninitialized : false,
    cookie : {                           // If we don't give cookie here, it will get generated automatically.
        secure: false,
        maxAge : SESSION_maxAge
    }
}));


const redirectLogin = (req,res,next) => {
    if(!req.session.userid) {return res.redirect('/login')}
    else{ next();}
}

const redirectHome = (req,res,next) => {
    if(req.session.userid) {return res.redirect('/home')}
    else{ next();}
}


// Database (Array form)
const users = [
    {id:1, name: "Dhruv", email: "dhruv@gmail.com", password: "123"},
    {id:2, name: "Gautam", email: "gautam@gmail.com", password: "123"},
    {id:3, name: "Dweep", email: "dweep@gmail.com", password: "123"}
]

// Routes
app.get('/', (req,res) => { 
    // const userid = req.session.userid;    // can use the same name or any different name for the "const"
     const {userid} = req.session;      // Here, we are DESTRUCTURING IT.     // we need to use the same name for "const"
    res.send(
    `<h1>Welcome!</h1>
    ${userid ? 
        `<a href = '/home'>Home</a> <br><br>
        <form action = '/logout' method = 'POST'> 
        <button>Log Out</button>
        </form>`
        : 
        `<a href = '/login'>Login</a> <br><br>
        <a href = '/registration'>Register</a> <br><br> `
    }`)
});

app.get('/home', redirectLogin, (req,res) => {    // Home pa toh ja hi raha hai is code ka through, BUT pehla CHECK kare ki kya iski SessionId created hai agar nahi hai toh "LOGIN" pa jaye. 
    res.send(`
        <h1>Home Page</h1>
        <a href = '/'>Main</a>

        <ul>
            <li>Name :- ${DATA.name}</li>
            <li>Email :- ${DATA.email}</li>
        </ul>
        `)
});

app.get('/login', redirectHome, (req,res) => {   // Same, yeh LOGIn pa toh cha; raha hai, BUT  iski SessionId already existed hai toh yeh banda sitha "HOME" par chale jaye. 
    res.send(`
        <h1>Login Page</h1>
        <form action = '/login' method = 'POST'>
            <input type = "email" name = "email">Email</input>
            <input type = "password" name = "password"> Password</input>
            <button type = "submit">Submit</button>
        </form>
        <a href = '/registration'>Don't have an account...</a>
        `)
});

app.get("/register",(req,res)=>{
    res.send(`
           <h1>Register</h1>
           <form action="/register" method="POST">
              <label for="Name">Name</label>
              <input type="text" name="name" required/></br>

              <label for="Email">Email</label>
              <input type="email" name="email" required/></br>

              <label for="Password">Password</label>
              <input type="password" name="password" required/><br>

              <input type="submit" value="Register"/>
           </form>
           <a href="/login">Login</a>
        `);
});

app.post('/login', (req,res) => { 
    const {email, password} = req.body;
    console.log("Email: "+ email);
    console.log("Password: "+password);
    if(email && password){   // agar usne email and password diya hai, toh finding user in the database
        const user = users.find(user => user.email === email && user.password === password);
        console.log(user);
        if(user){
            req.session.user = user;
            req.session.userid = user.id;        // session Id  &  userid   are    DIFFERENT.
            console.log("USER SESSION: ", req.session);
            return res.redirect('/home');
        }
    }
    res.redirect('/login');
});

app.post("/register",(req,res)=>{
    const { name, email, password } = req.body;

    if (name && email && password) {
        const exists = users.some(user => user.email === email);
        if (!exists) {
            const newUser = {
                id: users.length + 1,
                name,
                email,
                password
            };
            users.push(newUser);
            req.session.userId = newUser.id; // Log in the new user
            return res.redirect('/home');
        }
    }
    // If validation fails or user exists, redirect back to register
    res.redirect('/register');
});

app.post('/logout', (req,res) => { 
    req.session.destroy((err) => {       // here, (err), is a callback function.
        if(err){
            return res.redirect('/home');
        }
        res.clearCookie(SESSION_name);
        console.log("USER SESSION: "+req.session);
        return res.redirect('/');
    });
})