const http = require('http');

const server = http.createServer((req,res) => {
    res.setHeader('Content-Type', 'text/html');     // It tells the type of Data, server is responding with. It can be 'text/plain' also. Also, for JSON files, "application/json".
    res.end("<h1>Welcome to my First Node.js server</h1>");  // We can also use "res.write() but after that we have to end that resonse with "res.end()". But here, we need to print only one line that's why we have directly used "end" fn.
}).listen(3000, () => { // If we are writing the ".listen" fn. in the nest line, we need to write as "server.listen"
    console.log("Sever Started");
})