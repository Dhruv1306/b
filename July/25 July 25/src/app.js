const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.listen(3000, () => {
    console.log("Server Started");
})
app.use(express.urlencoded({ extended: true })); //A MIDDLEWARE.  To use req.body to read data from the client side
app.use(express.static(path.join(__dirname, 'src'))); // to serve/ it handles all static files like HTML, CSS, JS, Images()


// Now let's create routes for the application

app.get('/', (req,res) => { res.send("Home Page")})

app.get('/login', (req,res) => {
    res.sendFile('./UI/login.html', {root: __dirname}); // to serve the login page
})            // SUPPOSE, A person search a website. -> after tat, he CLICKS LOGIN BUTTON. THAT BUTTON TAKES HIM TO HERE, "/login" END-POINT.  

app.get('/registration', (req,res) => {
    res.sendFile('./UI/user/registration.html', {root: __dirname}); // to serve the registration page
})

app.post('/login', (req,res) =>{
    const bodyData = req.body;
    // console.log(bodyData.email);   // To check if you are getting the data 
    const users = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'));  // "users" now have access to the "user.json" file which has all the data of the loged users.   //read and parse the data present in json file
    const user = users.find(user => user.email == bodyData.email);          //finds and checks the email given by client is correct or not when he gave the detail in registration form
    // console.log(user);       // To check all the details about the user
    if(!user){ return res.send("User doesn't Exist") }
    if(user.password != bodyData.password){ return res.send("Invalid Password") }    // If the given password is incorrect it shows invalid
    if(user.isAdmin){ return res.redirect("/dashboard/admin") }                     // If the user is admin shows admin dashboard
    return res.redirect("/dashboard/user")   // here, it is going to the endpoint
})

app.post('/registration', (req,res) => {
    const users = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'))   // IT'S LIKE CREATING A DUPLICATE COPY
    const userData = req.body;
    userData.isAdmin = false;     // 🛑 Always add "isAdmin = false" for new users
    users.push(userData);        // HERE, IT'S PUSHING THE DETAILS INSIDE IT'S COPIED FILE   // SO,NOW THIS "users" FILE HAS THE UPDATED DETAILS.
    //fs.writeFileSync('./data/user.json', JSON.stringify(users));    // HERE WE ARE OVERWRITE/ PASTING THE DATA FROM THE COPIED FILE(i.e, users) BACK TO THE ORIGINAL "user.json" FILE WITH UPDATED DATA.
    fs.writeFileSync('./data/user.json', JSON.stringify(users, null, 4));  // Rather than printing all things in a SINGLE LINE  it will keep them in JSON form
    res.redirect('/login')    // again redirecting to an end-point.
})

app.get('/dashboard/:role', (req,res) => {
    const role = req.params.role;         // Here, we have taken params, cause ":role" -> it's a parameter.  After then, parameter of WHAT ?    ->  role.
    res.sendFile('/dashboard.html', {root: `./UI/${role}`})
})
