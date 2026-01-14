// Requires
const express = require('express');
const session = require('express-session');
const app = express();
const fs = require('fs');
const path = require('path');
app.listen(3000, () => console.log("Server Started"));










//Custom Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'version_2')));
app.use(session({
    secret: 'Hi',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 1     // 1 minutes
    }
}));
app.use((req,res,next) => {
    res.locals.VISA = req.session.user;
    next();
});
app.use('/dashboard/:role',(req,res,next) => {           // "req.params.role" will be undefined, because of the basic nature of middleware, it's accessible to all the routes regardless of if they didn't need it. Therefore, it's value will be undefined. And it will not work correctly. That's why, let's "Scope the Middleware to Relevant Routes Only" by introducing end-point. 
    res.locals.RouteRole = req.params.role;        // Yeh "RouteRole" hume yeh batayega ki banda jab login hua hai toh uska role kya hai ( jo ki hume "res.redirect" ka time pa aa raha hai)  or ussi hisaab sa is banda ko iska dashboard dikhaya jata hai, ki user ka dashboard show hoyega isse yeh fir admin ka.
    // Toh yaha tak toh bande ki "Authority" me koi deekat ho hi nahi sakti. PAR ISS "RouteRole" KO CHANGE KIYA JA SAKTA HAI URL sa, or Deekat bhi tabhi suruhoti hai jab koi banda "user" ho, mtlb ki ussa "res.locals.RouteRole"  me  "user" ka role assign ho  par vo URL me changes karde. Like, URL me jaha par "user" likah hai ussa badal kar "admin" likh de, toh usa "admin ka dashboard" show hone lagega, jo ki uski Authority me tha nahi.
    next();
});        

// const isAuthenticated = (req,res,next) => {              // Who
//     const VISA = res.locals.VISA;
//     console.log("Session User: ",VISA);
//     if(VISA) return next();
//     return res.redirect('/login');
// };

const isAuthenticated = (req,res,next) => {              // Who
    console.log("Session User: ",res.locals.VISA);
    if(res.locals.VISA) return next();
    return res.redirect('/login');
};

const isAuthorized = (req,res,next) => {               // What
    const VISA = res.locals.VISA;
    const RouteRole= res.locals.RouteRole;
    if(VISA && VISA.role == RouteRole) return next();
    res.status(403).send(`You are not allowed to access ${RouteRole} resources`);
};







//Routes
app.get('/', (req,res) => { res.send("Welcome to the Home Page!!")});

app.get('/registration', (req,res) => { res.status(200).sendFile('./src/UI/user/registration.html', {root: __dirname})})

app.post('/registration', (req,res) => {
    const userData = req.body;
    userData.isAdmin = false;
    const users = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'));
    users.push(userData);
    fs.writeFileSync('./src/data/users.json', JSON.stringify(users, null, 4));
    res.redirect('/login');
});

app.get('/login', (req,res) => { res.sendFile('./src/UI/login.html', {root: __dirname})});

app.post('/login', (req,res) => {
    const bodyData = req.body;
    const users = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'));
    const user = users.find(u => u.email === bodyData.email);
    if(!user) return res.status(404).send("User not found");
    if(user.password != bodyData.password) return res.status(401).send("Password is incorrect");

    // req.session.user = user;     // It will work fine, but during AUTHORIZATION it will fail.     READS THE COMMENTS IN Custom Middleware, Role.

    req.session.user = {...user, role: user.isAdmin ? 'admin' : 'user'};         // It's like putting your "TRUE Gender" in VISA too.  So that in future, you cannot show yourself as someone of Oposite Gender.It's like a fixed thing & you cannot change or manipulate it. 
    // And now, THIS WILL HELP US IN AUTHORIZATION.  (Check the condition used in "isAuthorized")

    return (user.isAdmin) ? res.redirect('/dashboard/admin') : res.redirect('/dashboard/user');
});

app.get('/dashboard/:role', isAuthenticated, isAuthorized, (req,res) => {
    // const Role = req.params.role;  // This "Role" variable is scoped to this specific route handler. Means, it can work in this block of code only.
    const Role = res.locals.RouteRole;
    res.sendFile(`./src/UI/${Role}/dashboard.html`, {root: __dirname});
})


/*  LAST COMMENT: Well in the end everything worked perfectly.
                    BUT, their is something that now feels like a waste.

                    -> MAKING A CUSTOM MIDDLEWARE FOR "role".

                        -> Yes, it's working perfectly. BUT,
                        -> We need to SCOPE this middleware to a specific route only. Discarding the natural behaviour of Middlewares.
                            * Think practically, IF WE have to SCOPE our Middleware to a specific route only, then why do we need to create a seperate middleware for that. 
                            * Cause, the things we are doing after creating our middleware are the same things that we are doing in our endpoint '/dashboard/:role'.
                            * In fact after creating a middleware, our line of code increases which is useless. 

                            * Also, without creating a specific middleware for this route, we can still access our "role" where we are using it, by using the same line of code "req.params.role", that we are also using after creating our middleware.
                            * Cause, We are accessing "Role" using our dynamic "role" parameter, Means using params and params are accessible:-
                                a) Routes, which matches that required Signature  (like, our '/dashboard/:role').
                                b) Middlewares that are attached to those Routes. ( like, 'isAutheticated' & 'isAuthorized', cause they are attached to the '/dashboard/:role' Route).

So, yeah...One more version will come...The Final one...'finalApp.js'....

TO BE CONTINUED...
*/