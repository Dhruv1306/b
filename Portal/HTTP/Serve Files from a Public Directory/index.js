const http = require('http');
const fs = require('fs');

http.createServer((req,res) => {
    if(req.url == '/'){ res.end("<h1>Home Page</h1>")}
    else if(req.url == '/public/style'){ res.end(fs.readFileSync('./public/style.css', 'utf-8'))}
    else {res.end("404 Not Found")}
}).listen(3000, () => { console.log("Server Started")});