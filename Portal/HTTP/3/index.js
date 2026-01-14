const http = require('http');
const fs = require('fs');
const queryString = require('querystring');

http.createServer((req, res) => {

    if(req.url == '/'){ return res.end("Hello there!!")}
    else if(req.url == '/form' && req.method == "GET"){
        res.setHeader('Content-type', 'text/html');
        res.end(fs.readFileSync('./form.html', 'utf-8'));
    }
    else if(req.url == '/form' && req.method == 'POST'){
        var bodyData= '';
        req.on('data', (chunk) => {
            bodyData += chunk.toString();
        });
        req.on('end', ()=> {
            console.log("Data before Parsing",bodyData);
            const QS = queryString.parse(bodyData);
            console.log("Data after Parsing",QS);
            return res.end(`Thank you, ${QS.name}. Your email is ${QS.email}`);
        });
    }
    else{ res.end("404 Not Found");}
}).listen(3000, () => { console.log("Server Started")})