const http = require('http');
const url = require('url');

http.createServer((req,res) => {
    const parsedUrl = url.parse(req.url, true);         // To get the url in readable form
    const endPoint = parsedUrl.pathname;               // To get the end-point
    const Name = parsedUrl.query.name;                // To get the KEY present in the url.

    if(req.url == '/'){ return res.end("Hii Everyone")}     // Home Page
    else if(endPoint === '/greet'){                        // End-Point : /greet
        res.setHeader('Content-type', 'text/plain');
        return (Name) ? res.end(`Hello ${Name}`) : res.end('Hello Guest');
    }
}).listen(3000, () => { console.log("Server Started")})


// ".pathname" is a property of that object which gives you the path part of the URL — everything after the domain and before the query string.

// ".query" is an object containing all the query parameters.