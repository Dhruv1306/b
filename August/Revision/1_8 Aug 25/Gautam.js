const http = require('http');
const fs = require('fs');
const queryString = require('querystring');   // to convert string data into object, we need "parse", which we will get through "querystring". 

http.createServer((req,res)=>{

    if(req.url == '/'){                                      // By default : req.method ==  GET
        res.setHeader("Content-type", "text/html");
        res.end(fs.readFileSync('./Home.html', 'utf-8'));
    }

    if(req.url == '/registration' && req.method == 'GET'){
        res.setHeader("Content-type", "text/html");
        res.end(fs.readFileSync('./registration.html', 'utf-8'));
    }

    if(req.url == '/registration' && req.method == 'POST'){
        var bodyData = '';        // to collect the data givien by the user

// Now, we are going to handle / trigger events 
        req.on('data', (chunk) => {
            bodyData += chunk.toString();      // now, data is stored
            
        });

        req.on('end', () => {                  // this event handles the ending & execution of the POST request
           const QS = queryString.parse(bodyData);  // for queryString
            console.log(QS);
            res.statusCode = 301;
            res.setHeader('location','/');  // similar as "redirect" in express        
            res.end();
        });
    }
    return;
}).listen(3000, ()=>{
    console.log("☠️  DOOMSDAY!!!💀☠️")
})