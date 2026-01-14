const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
app.listen(3000, () => { console.log("Server Started") })
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res) => { res.send("<h1>Home Page!!</h1>") }) 

app.get('/login', (req,res) =>{ res.sendFile('./src/login.html', {root: __dirname})})
app.post('/login', (req,res) => {
    const bodyData = req.body;
    console.log(bodyData);
    const users = JSON.parse(fs.readFileSync('./src/data/user.json', 'utf-8'));
    const user = users.find(user => user.email == bodyData.email);

    if(!user){ return res.send("User doesn't exist.")}
    if(user.password != bodyData.password){ return res.send("Invalid Password")}
    if(user.isAdmin){ return res.redirect('/dashboard/admin')}
    return res.redirect('/dashboard/user')
})

app.get('/dashboard/:role', (req,res) => {
    const role = req.params.role;
    return res.sendFile('/dashboard.html', {root: `./src/UI/${role}`})
})

// 1. Whenever we do "res.sendFile()", PARAMETERS are  ->  filePath  & root

/* Steps: 

1. A user visits a website 
    -> So it means the user visits a SERVER's END-POINT. So,
        a) We need to create a server (using express).
        b) We need to create an End-Point which directs us to the Home page of the site.

2. Now, we have 2 scenario.  i) User Exist      ii) User doesn't Exist
    -> So, 1st, we need to check whether the user exist or not using LOGIN Info.
        a) For that, we need to create a login page (login.html) with POST METHOD (for user, to post/submit his details).
        b) Also, a '/login' route with GET method.
    
    -> Now, user will FILL his information and enter the submit button. So, 
        -> First of all, we need to handle those details that user has submit/POSTED.
            a)app.use(express.urlencoded({ extended: true }));       // Now, those details are in the "req.body". 

        -> Now, we need to check whether those details are true or not, i.e, whether the data provided by the user matches with the data we have about our registered users.
            a) So for that, first of all, we need to create a file which stores the REGISTERED USERS DATA (user.json).

            ** NOTE:- WE ALSO NEED TO CREATE A ROUTE ('/login') WITH A POST METHOD TO VERIFY THE THINGS.

            b) Now, we need to create 3 VARIABLES.
                i) One will store the "req.body" Data (bodyData).
                ii) 2nd  will store the COPY of the "user.json" file (users).
                iii) 3rd one will specifically store the data about that user who tryied to login IF WE FOUND THAT USER IN OUR DATA.
            c) Now we'll compare both the DATA to check: 
                i) Does the user EXIST?
                ii) Does all the details given by the user are CORRECT OR NOT?
            d) Now if all the details are correct, CHECK IS the user a USER OR ADMIN & then, redirect it accordingly to it's destinated FILE OR A ROUTE, IF YOU HAVE CREATED ONE.

            ** NOTE:- If you create a route that handles these "role" things ( /dashboard/:role ).  It will be a GET Method.

*/

/* 
Now, what if the user doesn't exist / the user isn't a registered user

    -> He needs to register first.
        

*/