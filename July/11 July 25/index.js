const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {

    if(req.url === '/'){
        res.setHeader('Content-type','text/html');
        res.end(fs.readFileSync('./index.html', 'utf-8'));
    }
    else if(req.url === '/index.css'){
        res.setHeader('Content-Type', 'text/css');
        res.end(fs.readFileSync('./index.css','utf-8'));
    }
    else if(req.url === '/img.jpg'){
        res.setHeader('Content-Type', 'image/jpeg');
        res.end(fs.readFileSync('./img.jpg'));
    }
        else if(req.url === '/img2.jpg'){
        res.setHeader('Content-Type', 'image/jpeg');
        res.end(fs.readFileSync('./img2.jpg'));
    }
    else {
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found');
    }
}).listen(3000, () => {
    console.log('Server Started');
})

// This code will creates a simple HTTP server that serves an HTML file. Listens to port no. 3000