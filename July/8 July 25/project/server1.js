const http = require('http');

const user = {
    name: "John Doe",
    age: 30,
    profession: "Developer"
};

const server = http.createServer((req,res) => {
    if(req.url == '/api/user'){
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(user));
    }
    else{ res.end('404-Page Not Found');}
}).listen(3000, () => {
    console.log('Server Started');
});