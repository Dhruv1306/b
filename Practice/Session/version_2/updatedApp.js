// DON'T RUN THIS FILE IT'S JUST FOR KNOWLEDGE.  
// BUT, IF YOU CAN'T CONTROL YOUR ANXIOUSNESS, LET ME TELL YOU THAT THIS CODE WILL RUN PERFECTLY FOR WHAT IT IS MADE FOR!!
// FOR, CLEAN & FINAL VERSION OF THIS CODE's FUNCTIONALITY, CHECK "finalApp.js". 

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const session = require('express-session');
app.listen(3000, () => { console.log("Server Started")});

app.use(express.json());                      // If we ever send JSON data (e.g., via fetch or API clients), we need it.
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'Practice_2')));
app.use(session({
    secret: "KEY",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 2  // 2 minutes     // It's about the "cookie expiration". BUT, "Cookie expiration" ≠ "Session store" expiration.             // This sets the cookie expiration, but it does not destroy the session on the server when the cookie expires. So the session object (req.session.user) might still exist in memory or in your session store.
    }
}));
app.use((req,res,next) => {                  
  res.locals.VISA = req.session.user;         // Here, "VISA" is our Variable. So, that we don't need to write "req.session.user" every time it's needed.
  next();
});

const isAuthenticated = (req,res,next) => {      // Who
    console.log("Session user: ", req.session.user);    // optional debug
    if(req.session.user){ return next(); }        // ✅ Checks whether the user is logged in  &  and the session is also not expired.   BASICALLY, It's asking, “Does this user have a valid session with user data?”.  CAUSE, If the session has expired or the user has never logged in, then the req.session.user will be undefined.
    /* In my words, it checks:
                  1) Kiski baat ho rahi hai   ->   yeah cheez isa pata lagegi  "req.session.user" sa. Kyuki isme us user ka sara data hai jo log in hua tha.
                  2) Kya uska session abhi bhi active / valide hai yeh nahi    ->    Yeh isa pata chalega isi  "req.session.user" sa hi. Ha isme sirf us logged in user ka data hi hoga but kyuki hum "session" use kar rahe hai toh jab bhi koi user log in karta hai toh us user ka sath ek uska personal "session" connect ho jata hai and us "session" ki properties (like "maxAge") bhi uska sath jud jati hai jo actively chal rahi hoti hai. Toh in future jab vo user dubara us page / URL ko visit karega, toh agar uski "maxAge" abhi bachi hogi, mtlb ki uska session active hai, to yeh us page ko open kardega NAHI toh agar uska session expire ho chuka hoga toh voh usa "LOGIN PAGE" pa bhej dega dubara sa login karne ka liya or firsa us user ko ek new session milega.
    */
    // return res.redirect('/login');               // Normal returning to the "LOGIN PAGE".
    return res.redirect('/login?expired=true');    // Returning with an ERROR Message.
};

const isAuthorized = (req,res,next) => {          // What
    const routeRole = req.params.role;
    const loggedInUser = req.session.user;       // loggedInUser & sessionUser are the same thing.
    if(loggedInUser && loggedInUser.role == routeRole){ return next(); }       // 
    res.status(403).send(`You are not allowed to access ${routeRole} resources`);
}

app.get('/', (req,res) => { res.status(200).send("Home Page")});
app.get('/registration', (req,res) => { res.status(200).sendFile('./src/UI/user/registration.html', {root: __dirname})});
app.post('/registration', (req,res) => {
    const userData = req.body;
    userData.isAdmin = false;
    const users = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'));
    users.push(userData);
    fs.writeFileSync('./src/data/users.json', JSON.stringify(users,null,4));
    res.redirect('/login');
});
app.get('/login', (req,res) => { 
    const expired = req.query.expired === 'true'; 
    const message = expired ? 'Session expired. Please log in again' : '';   // Always remember that we can't pass variables directly to static HTML. ( In this case, the message & expired variables.)
    res.status(200).sendFile('./src/UI/login.html', {root: __dirname});
});
app.post('/login', (req,res) => {
    const bodyData = req.body;
    const users = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'));
    const user = users.find(user => user.email === bodyData.email);   // The "user" variable here, only exists during the login request. Once that request finishes, it's gone.
    if(!user) return res.status(404).send("User not found");
    if(user.password != bodyData.password) return res.status(401).send("Password is incorrect");   // 401 - Unauthorized   ( In this case, email exist BUT password doesn't match )
    
    // req.session.user = user;        // req.session.user   ->   A Custom Property that we are attaching to the user’s session object. It stores information about the currently logged-in user. It’s a unique object for each user — tied to their session ID. 
    // So, once a user logs in, we store their info in "req.session.user".
    // By assigning this "user" variable to "req.session.user", we're saying:-  “Store this user in the session so I can access it on future requests.”  So now, on any route we can access this user.
    // And, "req.session.user" becomes the AUTHENTICATED Identity of the user for the duration of their session.
    // Also, Our "isAuthenticated"  &  "isAuthorized"  only works because we stored the user in the session.

    /* 🧪 Analogy:
          Think of "user" variable as the PASSPORT shown at login.
          "req.session.user" is the VISA stamped into their session — it lets them travel through your app until it expires.
    */

    req.session.user = {...user, role: user.isAdmin ? 'admin' : 'user'};    // It's like the "this" keyword in JAVA. Read the note below......

    // if(user.isAdmin) return res.redirect('/dashboard/admin');
    // return res.redirect('/dashboard/user');
    return res.redirect(user.isAdmin ? `/dashboard/admin/${user.username}` : `/dashboard/user/${user.username}`);
});
app.get('/dashboard/:role/:name', isAuthenticated, isAuthorized, (req,res) => {
    const role = req.params.role;
    res.sendFile(`./src/UI/${role}/dashboard.html`, {root: __dirname});
});
app.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/login');
});


/* I'm thinking to put "req.session.user" in a const variable, like :  const VISA = req.session.user;

    For that I can do either of these 2 things: 

        a) I need to create that constant variable every time in that route where I am using the "isAuthenticated" or "isAuthorized" function.
        b) I can make a Custom middleware to attach that const variable globally in every route (wherever needed).
*/


/* Edge Case_1 :-   Reading and writing JSON files can fail. Consider wrapping in "try/catch":
                Suppose, if that "users.json" file doesn't exist or malformed.

                let users = [];
                try {
                  users = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'));
                } catch (err) {
                  return res.status(500).send("Error reading user data");
                }
*/

/*
🔐 res.status(401) — It Means

HTTP 401 Unauthorized is used when:
- The client request lacks valid authentication credentials.
- The server refuses to authorize the request.
It signals:
“You’re not allowed in until you prove who you are.”

*/

// NOTE:- Always remember that we can't pass variables directly to static HTML.


/* NOTE :- 

    The "..." syntax you're referring to is called the spread operator, and it’s a powerful tool in JavaScript for copying or merging objects.
    It copies all properties from the user object into a new object.

So if "user" looks like:
{
  username: 'dhruv',
  email: 'dhruv@example.com',
  password: '123',
  isAdmin: true
}


Then, when doing:
{
  ...user,
  role: 'admin'
}

It becomes:
{
  username: 'dhruv',
  email: 'dhruv@example.com',
  password: '123',
  isAdmin: true,
  role: 'admin'
}


✅ Why We Use It Here
    - We want to preserve all original user data
    - But we also want to add a new role property
    - Using ...user avoids manually copying each file


🛠️ Without Spread Operator (More Verbose)
You’d have to write:

req.session.user = {
  username: user.username,
  email: user.email,
  password: user.password,
  isAdmin: user.isAdmin,
  role: user.isAdmin ? 'admin' : 'user'
};


// This SPREAD Operator also helps if we  want to override a property.

*/