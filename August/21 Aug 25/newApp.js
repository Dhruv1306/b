//Session based Auth

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const { //these are some special keywords we will be needing for the codes
    PORT = 5050,
    SESS_LIFETIME = 1000 * 60 * 60 * 2 ,// for two hrs of session life
    SESS_SECRET = 'secret', //secret key of the session
    SESS_NAME = 'sid' // name of the session
} = process.env // these variables are accessible to all the files


const app = express();

app.use(bodyParser.urlencoded({extended : true}));

//Session configuration
app.use(session({
    name : SESS_NAME, //name of the session 
    secret : SESS_SECRET, // secret key of the session and by default we need to give these
    resave : false, // By default we need these
    saveUninitialized : false, // by default we need to give these
    rolling: false,       // Used to exceed the session life..IF user interacted or reload the page. IT'LL WORK IF IT'S VALUE IS `true`.      Only works IF YOU RELOAD. 
    cookie : {
        maxAge : SESS_LIFETIME, //cookie life time
        expires : new Date(Date.now() +  SESS_LIFETIME )  // It's a deprecated property
    }
})); // session created automatically when app runs

const users = [ // This is our database where we have stored the data
    {id : 1, name : "Dhruv", email : "d@gmail.com", password : "123", role : "admin"},
    {id : 2, name : "Gautam", email : "g@gmail.com", password : "456", role : "false"},
    {id : 3, name : "Dweep", email : "d@gmail.com", password : "789", role : "false"}
]

const checkRole = (role)=>{
    return ((req,res,next)=>{
        const {userId} = req.session;
        const user = users.find(user => userId === user.id);
        if(user && user.role === role){ next();}
        else { res.status("403").send("<h1>Unauthorized Access</h1>")}
    })
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
    const {userId} = req.session //creates a userId for session and extracted it from req.session
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



app.get("/home",redirectLogin,(req,res)=>{ //here redirectLogin your session is not created and you trying to access home page you get redirected to login page
    const {userId}=req.session
    const user=users.find(user=> userId===user.id)
    res.send(`
        <h1>Home Page</h1>
        <a href="/">Main</a>
        <ul>
           <li>Name : ${user.name}</li>
           <li>Email : ${user.email}</li>
        </ul>
        `)
});

app.get("/login",redirectHome,(req,res)=>{ //here redirectHome checks if you have session created and trying to go to login page again
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
            req.session.userId = user.id; // userid in database has been made our session id
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
            req.session.userId = newUser.id; // Log in the new user
            return res.redirect('/home');
        }
    }
    // If validation fails or user exists, redirect back to register
    res.redirect('/register');
});

//Admin page restricted to admin only
app.get("/admin",checkRole("admin"),(req,res)=>{ //checkRole(role:"") is a special type of middleware to check the role for accessing this page
    res.send('<h1>This is Admin Page</h1>');
})

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