// REQUIRING STUFFS & STARTING THE SERVER
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
app.listen(3000, () => { console.log("Server Started")});

// CUSTOM MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'version_2')));    // The folder we give here is the folder in which our "main executable file" is present


// ROUTES
app.get('/', (req,res) => {
    res.send("Hello, it's app.js of version_2");
});

app.get('/registration', (req,res) => {
    res.sendFile('./src/UI/user/registration.html', {root: __dirname});
});

app.post('/registration', (req,res) => {
    const userData = req.body;
    userData.isAdmin = false;
    const users = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'));
    users.push(userData);
    fs.writeFileSync('./src/data/users.json', JSON.stringify(users, null, 4));
    res.redirect('/login');
});

app.get('/login', (req,res) => {
    res.status(200).sendFile('./src/UI/login.html', {root: __dirname});
});

app.post('/login', (req,res) => {
    const bodyData = req.body;
    const users = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'));
    const user = users.find(user => user.email === bodyData.email);
    if(!user) return res.status(404).send("User not found");
    if(user.password != bodyData.password) return res.status(404).send("Wrong Password");
    return (user.isAdmin) ? res.redirect('/dashboard/admin') : res.redirect('/dashboard/user');
});

app.get('/dashboard/:role', (req,res) => {
    const role = req.params.role;
    res.sendFile(`./src/UI/${role}/dashboard.html`, {root: __dirname});
});


// Started at: 4:07         Completed at: 4:23        Total time taken: 16 minutes.


/*  In, GET of '/login'  &  '/registration', we can write this also :- 

    app.get('/login', (req,res) => { res.sendFile('dashboard.html', {root: __dirname+"/src/UI/admin/"})});
    app.get('/login', (req,res) => { res.send(fs.readFileSync('./src/UI/admin/dashboard.html', 'utf-8'))});
*/