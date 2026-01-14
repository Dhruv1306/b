const http = require('http');
const fs = require('fs');

http.createServer((req,res) => {

    if(req.url == '/data.html'){
        res.writeHead(200, {'content-type':'text/html'});
        res.end(fs.readFileSync('./6.html','utf-8'));
    }
    else if(req.url == '/data.txt'){
        res.writeHead(200, {'content-type':'text/plain'});
        res.end(fs.readFileSync('./6.txt','utf-8'));
    }
    else if(req.url == '/data.json'){
        res.writeHead(200, {'content-type':'application/json'});
        res.end(fs.readFileSync('./6.json','utf-8'));
    }
    else{ res.end("404 NOT FOUND")}
}).listen(3000, () => { console.log("Server Started")})