const http = require('http'); //importing http as it is required for the creation of server

function requestHandler(request,response){
    response.setHeader('Content-Type','text/plain'); // here the setHeader function sets the content type of the response

    response.write('first response recieved');// To give the response we use write function

    response.end();// this ends the repsonse as an endline.
}

// Now we want to send an html file as an repsonse so we can do it like this 

function requestHandler2(request,response){
    response.writeHeader(201, { //this code is for writing a Header along with its status number
        'Content-Type': 'text/html'
    });
    response.write('<html>')
    response.write('<body>')
    response.write('<h1>How are you doing</h1>')
    response.write('</body>')
    response.write('</html>')

    response.end();
}
// But writing an html response like this is very lenghty and complex so we can do with other method
// Make an html file for response like home.html
// After that use fs module fileRead command and store it in a variable then call that variable in response

function requestHandler3(request,response){
    const fs = require('fs'); // now with this we can call and html file as an response instead of writing it

    const homePage = fs.readFileSync('./home.html','utf-8');
    response.write(homePage);
    response.end();
}

//Now we want different response for different urls in our server so we can do it like this

function requestHandler4(request,response){
    if(request.url == '/home'){ //how we different responses is in browser when we search localhost:3000/homes
        response.write('<h1>Home Page</h1>') //this response will appear
    }
    else if(request.url == '/Movies'){ //if we search localhost:3000/Movies this response will appear
        response.write('<h1>Movie Page</h1>')
    }
    else{
        response.write('<h1>Error : 404</h1>') // if we search something else this will appear
    }

    response.end();
}
const server = http.createServer(requestHandler4); //creates a server and store the returned object of the server in a variable server
// here the createServer function calls requesthandler function for the processing of request and repsonse.

server.listen(3000,(err)=>{  // here 3000 is the server portnumber from where it will along along with a callback function for error management
    if(err){
        console.log(err);
    }
    else{
        console.log("Server started at 3000");
    }
})