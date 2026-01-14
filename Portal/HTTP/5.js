const http = require('http');

http.createServer((req,res) => {
    const Time = new Date().toString();
    const Hour = new Date().getHours();

    if(req.url == '/'){ 
        console.log("Current Time is: " + Time);
        res.setHeader('Content-type', 'text/plain'); 
        res.end("Current Time: " + Time);
    } 
    
    else if(req.url == '/time-check' && req.method == 'GET'){
        console.log("Current Hour is: " +Hour);
        if(Hour < 12){
            res.writeHead(302, {'Location':'/morning'});     // Status code: 302,  is used for TEMPORARY REDIRECT.
            res.end();
        }
        else{ 
        res.writeHead(302, {'Location':'/evening'}); 
        res.end(); 
    }
    }

    else if(req.url == '/morning'){
        res.writeHead(200, {'Content-type':'text/html'});      // 200 -> OK
        res.end("<h1>Good Morning</h1>");
    }

    else if(req.url == '/evening'){
        res.writeHead(200, {'Content-type':'text/html'});
        res.end("<h1>Good Evening</h1>");
    }

    else{ res.end("404 Not Found")}

}).listen(3000, () => { console.log("Server Started")})