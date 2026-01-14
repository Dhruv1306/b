const http = require('http');

const server = http.createServer((req,res) => {
    res.setHeader('Content-Type','text/plain');

    if(req.url === '/home'){
        res.end("Home Page");
    }
    else if(req.url === '/about'){
        res.end("About Us");
    }
    else {
        // res.statusCode = 404;
        res.end("404 - Page Not Found");
    }
})

server.listen(3000, () => {
    console.log("Server started at port number 3000");
})     

// ALWAYS SAVE YOUR CODE AFTER EVERY CHANGES *TO AVOID ERRORS*

// NOTE :- Try to put the "setHeader" cmd every time for each condition, so that it can differentiate between html & plain, if asked by the user.