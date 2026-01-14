const http = require('http');
const fs = require('fs');

const notes = [];  // In-Memory Storage

http.createServer((req,res) => {
    if(req.url == '/'){ return res.end("Home Page");}

    else if(req.url == '/notes' && req.method == 'GET'){
        res.writeHead(200, {'Content-type':'application/json'});
        res.end(JSON.stringify(notes)); 
        // res.end(notes);       // This is wrong  -> -> cause "content-type" is "application/json".
    }

    else if(req.url == '/notes' && req.method == 'POST'){
        var bodyData = '';
        req.on('data', (chunk) => {
            bodyData += chunk;
        });
        req.on('end', () => {
            const parseData = JSON.parse(bodyData);  // We are expecting "application/json" data. That's why, I have used "JSON.parse".
                                                    // If we expect "urlencoded" data, then we will use "queryString.parse". 

            if(!parseData.note){ return res.end('Missing "note" field : "note" field is required'); }           // Checking, if "note" field is their or not.
            else if(req.headers['content-type'] != 'application/json'){ return res.end('Invalid Content-Type. Expected application/json'); }   // Checking Content-Type
            else{ 
                notes.push(parseData.note);
                console.log(notes);
                res.writeHead(200, {'Content-type': 'application/json'});
                res.end(JSON.stringify({message: 'Note Added', notes}, null, 2));
            }
        });
    }

    else{ res.end("404 Not Found")}
}).listen(3000, () => { console.log("Server Started")})


// "req.headers" is an object, not a function.
//    Therefore,   req.headers();  -> ->  WRONG 
//                 req.headers[];  -> ->  RIGHT
