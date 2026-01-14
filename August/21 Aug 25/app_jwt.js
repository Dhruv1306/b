const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');  // By this we will create token
const cookieParser = require('cookie-parser');


const { //these are some special keywords we will be needing for the codes
    PORT = 5050,
    JWT_EXPIRES = "2h",      // 2 hrs. 
    JWT_SECRET = "supersecret"
} = process.env // these variables are accessible to all the files


const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());   // use the variable name you have declared above & make3 it a fn.


const users = [ // This is our database where we have stored some data
    {id : 1, name : "Raghav", email : "r@gmail.com", password : "123"},
    {id : 2, name : "Mohan", email : "m@gmail.com", password : "456"},
    {id : 3, name : "Rana", email : "r@gmail.com", password : "789"}
]

function generateToken(user){
    // return jwt.sign(user, JWT_Expires)   OR

    return jwt.sign({id: user.id, name: user.name, email: user.email}, JWT_SECRET)  // we passes 2 things here, `payload` & `secret` key. Secret key we already made above, we need payload, that we'll take from frontend
}

//We are making a middleware if client is logged in and is trying to access login page so first his session should be checked
// If the session is created he cant go to session page and if session is not created he can go to login page

const redirectLogin = (req,res,next)=>{
    if(!req.session.userId){
        res.redirect("/login"); //if their is no session he goes to login
    }
    else{
        next();
    }
}

const redirectHome = (req,res,next)=>{
    if(req.session.userId){
        res.redirect("/home"); //if you can go to home or not is decided by this code
    }
    else{
        next();
    }
}

app.get("/",(req,res)=>{
    // const {userId} = req.session //creates a userId for session and extracted it from req.session
    const userId = 0;
    res.send(`
    <h1>Welcome</h1>
    ${userId ? ` 
        
    <a href="/home">Home</a>
    <form action ="/logout" method = "POST">
    <button>Logout</button>
    </form>
        ` : `
        
    <a href="/login">Login</a>
    <a href="/register">Register</a>
        `}
        `); // If the userId is true send home and logout button and if false login and register
});



app.get("/home",(req,res)=>{ //here redirectLogin your session is not created and you trying to access home page you get redirected to login page
    // const {userId}=req.session
    // const user=users.find(user=> userId===user.id)
    res.send(`
        <h1>Home Page</h1>
        <a href="/">Main</a>
        <ul>
           <li>Name : </li>
           <li>Email : </li>
        </ul>
        `)
});

app.get("/login",(req,res)=>{ //here redirectHome checks if you have session created and trying to go to login page again
    res.send(`
           <h1>Login</h1>
           <form action="/login" method="POST">
           <label for="Email">Email</label>
              <input type="Email" name="email"/></br>

              <label for="Password">Password</label>
              <input type="Password" name="password"/><br>
              <input type="Submit"/>
           </form>

           <a href="/register">Register</a>
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

app.post("/login",(req,res)=>{
    const {email,password} = req.body; // same name as given in form in the object
    // console.log(email);
    // console.log(password);
    // res.send("Data Given");

    if(email && password){
        //finding user from database mentioned above
        const user = users.find(user => user.email === email && user.password === password);
        if(user){
            const token = generateToken(user);
            // here, we need to make cookie explicitely regardless of like session in which it created successfully.
            res.cookie("token",token);
            console.log(req.cookies.token);
            // console.log(res.cookie.token);
           return res.redirect("/home");
        }
    }
    res.redirect("/login");
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
            // req.session.userId = newUser.id; // Log in the new user
            return res.redirect('/home');
        }
    }
    // If validation fails or user exists, redirect back to register
    res.redirect('/register');
});

app.post("/logout",(req,res)=>{
    req.session.destroy((err)=>{ //this destroys the session
        if(err){
            return res.redirect("/home"); //if their is a error in logging out it does not allow to logout
        }
        else{
            res.clearCookie(SESS_NAME); //if no error it clears the cookie
            res.redirect("/login"); //and redirect us to login page
        }
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});