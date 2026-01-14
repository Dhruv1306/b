// const http = require('http');
// const fs = require('fs');
// const queryString = require('querystring');

// http.createServer((req,res) => {

//     if(req.url == '/'){
//         res.writeHead(200,{'Content-type':'text/html'});
//         res.end(fs.readFileSync('./Home.html', 'utf-8'));
//     }

//     if(req.url == '/registration' && req.method == 'GET'){
//         res.writeHead(201, {'Content-type':'text/html'});
//         res.end(fs.readFileSync('./registration.html', 'utf-8'));
//     }

//     if(req.url == '/registration' && req.method == 'POST'){
//         var bodyData = '';

//         req.on('data', (chunk) => {
//             bodyData += chunk.toString();
//         });

//         req.on('end', () => {
//             const QS = queryString.parse(bodyData);
//             console.log(QS);
//             res.writeHead(301, {'location':'/'});
//             res.end();
//         });
//     }
//     // return;
// }).listen(3000, () => { console.log("Server Started")})









// **********************************************************************************************************************************







// const express = require('express');
// const app = express();
// const fs = require('fs');
// const path = require('path');

// app.listen(3000, ()=>{ console.log("Server Started")});

// app.use(express.urlencoded({extended : true}))
// app.use(express.static(path.join(__dirname, '../../25 July 25/src')))

// app.get('/', (req,res) => { res.send(fs.readFileSync('./Home.html', 'utf-8'))})
// app.get('/login', (req,res) => { res.send(fs.readFileSync('../../25 July 25/src/UI/login.html', 'utf-8'))})
// app.get('/registration', (req,res) => { res.send(fs.readFileSync('./registration.html', 'utf-8'))})

// app.post('/login', (req,res) => {
//     const bodyData = req.body;
//     const users = JSON.parse(fs.readFileSync('../../25 July 25/src/data/user.json', 'utf-8'));
//     const user = users.find(user => user.email == bodyData.email);
//     if(!user){ return res.send("user doesn't exist"); }
//     if(user.password != bodyData.password){ return res.send("Password is incorrect"); }
//     if(user.isAdmin){ return res.redirect('UI/admin/dashboard.html')}
//     return res.redirect('UI/user/dashboard.html');
// })

// app.post('/registration', (req,res) => {
//     const users = JSON.parse(fs.readFileSync('../../25 July 25/src/data/user.json', 'utf-8'))
//     const userData = req.body;
//     userData.isAdmin = false;
//     users.push(userData);       // The data present in "users" now is in array format. Therefore we need to convert that data into String format. 
//     fs.writeFileSync('../../25 July 25/src/data/user.json', JSON.stringify(users, null, 4));   // parameters -> value(data), replacer, space
//     res.redirect('/login');
// })



//    ********************************************  NOTE  *****************************************************



// What you can REDIRECT To using "res.redirect" :- 

// 1. Redirect to an END-POINT (Route).
// 2. Redirect to an external link.

/*
NOTE:- Technically, we can't redirect to an HTML file, CAUSE they are STATIC in Nature. 
So, to redirect to an HTML file we need to serve it via a STATIC MIDDLEWARE. 

Middleware:-     app.use(express.static('___hereComesTheMainFolderName___'));

we'll also use "path.join()" to avoid any path related issues.

      -> -> ->  app.use(express.static(path.join(__dirname, '___hereComesTheMainFolderName___')));

then, we can directly redirect to any of those static files present inside that folder. 



NOTE:-  after thses all, in res.redirect()   We will provide the URL path, NOT the File System path (Relative File Path).


Assuming your static middleware serves files from "../../25 July 25/src", and your HTML is in "UI/admin/dashboard.html", then redirect like this:

if (user.isAdmin) {
  return res.redirect('/UI/admin/dashboard.html');
}
return res.redirect('/UI/user/dashboard.html');


No need to include ."./../25 July 25/src" in the redirect — the static middleware already maps that folder to the root (/) of your server.

*/









// **********************************************************************************************************************************








// const http = require('http');
// const fs = require('fs');
// const queryString = require('querystring');

// http.createServer((req,res) => {

//     if(req.url == '/'){ res.writeHead(200, {'Content-type':'text/html'}); res.end(fs.readFileSync('./Home.html', 'utf-8'))}
//     if(req.url == '/registration' && req.method == 'GET'){ res.writeHead(201, {'Content-type':'text/html'}); res.end(fs.readFileSync('./registration.html', 'utf-8'))}
//     if(req.url == '/registration' && req.method == 'POST'){ 
//         var bodyData = '';

//         req.on('data', (chunk) => {
//             bodyData += chunk.toString();
//         })
//         req.on('end',() => {
//             const QS = queryString.parse(bodyData);
//             console.log(QS);
//             res.writeHead(301, {'location':'/'});
//             res.end();
//         })

//     }
// }).listen(3000, () => { console.log("Server Started")})









// **********************************************************************************************************************************







// const express = require('express');
// const app = express();
// const fs = require('fs');
// const path = require('path');

// app.listen(3000, () => { console.log('Server Started')})

// app.use(express.urlencoded({extended : true}))
// app.use(express.static(path.join(__dirname, '../../25 July 25/src')))

// app.get('/', (req,res) => { res.send(fs.readFileSync('./Home.html', 'utf-8'))})
// // app.get('/login', (req,res) => { res.send(fs.readFileSync('../../25 July 25/src/UI/login.html', 'utf-8'))})
// app.get('/login', (req,res) => { res.redirect('/UI/login.html')})
// app.get('/registration', (req,res) => { res.send(fs.readFileSync('./registration.html', 'utf-8'))})

// app.post('/login', (req,res) => {
//     const bodyData = req.body;
//     const users = JSON.parse(fs.readFileSync('../../25 July 25/src/data/user.json', 'utf-8'));
//     const user = users.find(user => user.email == bodyData.email);
//     if(!user){ return res.send("<h3>User doesn't exist</h3>");}
//     if(user.password != bodyData.password){ return res.send('<h3>Password is incorrect</h3>');}
//     if(user.isAdmin){ return res.redirect('/UI/admin/dashboard.html');}
//     return res.redirect('/UI/user/dashboard.html');
// })

// app.post('/registration', (req,res) => {
//     const userData = req.body;
//     const users = JSON.parse(fs.readFileSync('../../25 July 25/src/data/user.json', 'utf-8'));
//     users.push(userData);
//     fs.writeFileSync('../../25 July 25/src/data/user.json', JSON.stringify(users, null, 4));
//     res.redirect('/UI/login.html');
// })