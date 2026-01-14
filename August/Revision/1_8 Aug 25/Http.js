const http = require('http')
const fs = require('fs')
// NOTE:-  We identify a particular server through the PORT No. 

const server = http.createServer((req,res) => {
    if(req.url == '/'){
        res.writeHead(200,{'Content-Type':'text/html'});    // parameters -> status code, content-type 
        res.end("<h1> Hello Everyone </h1>");
    }
 

    else if(req.url == '/file'){
        res.writeHead(202, {'Content-Type':'text/html'});
        res.end(fs.readFileSync('./DEMO.txt', 'utf-8'));
    }


    else if(req.url == '/about'){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end("<h2> About Page </h2>");
    }


    else{ 
        res.end('404 Not Found');
    }
}).listen(3000, ()=>{ console.log("Server Started");});


/*
 url :- Full path/ link  (ex:- http://localhost:3000/product/get)

    here, http :- protocol
          https://localhost:3000 :- HostName ( we get it from dns server )
          /product :- route
          / get : - Method




Note:-    dns -> Ip   & domain

          Ip -> hosting (like aws, google)
          domain name :- we get from domain registrar

*/