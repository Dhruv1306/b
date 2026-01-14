const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) =>{
    if(req.url === '/home'){
        res.setHeader('Content-Type', 'text/html');
        res.end(fs.readFileSync('./index.html', 'utf-8'));
    }
    else {
        res.statusCode = 404;
        res.end("404 - Page Not Found");
    }
}).listen(3000,() =>{
    console.log("Server started");
})