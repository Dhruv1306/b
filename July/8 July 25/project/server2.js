// In this question, we need to collect the data chunks and then parse them. 

const http = require('http');

const obj = {
    "username" : "joe",
};

const server = http.createServer((req,res) => {    // Create an HTTP server. The callback handles incoming requests.
    if(req.url == '/submit' && req.method == 'POST'){    // CHECK
        let body = '';     // To initialize an empty string to collect incoming data chunks.

        req.on('data', chunk => {
            body += chunk;   // Collect incoming data chunks as they arrive and add them to 'body'.
        });
        req.on('end', () => {      // Parse the data (assuming it's a JSON)
            try{
                const parsed_Data = JSON.parse(body);  // Convert the collected string into a JavaScript object.
                res.end(`Received data for user: ${parsed_Data.username}`);   // Respond with the username from the parsed data.
            } catch(err){
                res.end('Invalid JSON');   // Respond with an error message if parsing fails.
            }
        });
    }
    else { res.end('404-Page Not Found');}  // For any other route, send a 404 message and end the response.
}).listen(3000, () => {
    console.log('Server 2 has started');
});

/* 

The .on in req.on is a method used to listen for events on an event emitter in Node.js.

In this case, req (the request object) is a readable stream and an event emitter.

->  req.on('data', callback) listens for 'data' events (when a chunk of data arrives).
->  req.on('end', callback) listens for the 'end' event (when all data has been received).
So, .on attaches a function to run when a specific event occurs.

Syntax:- 

    req.on('data', chunk => {   // 1st.  When the DATA CHUNKS START coming

    });
    req.on('end', () => {   // 2nd.  When the Transfer COMPLETED & END.

    });

*/

/* 

✅ Yes, the code you used is a universal/basic pattern to manually read and parse incoming POST data — if you're not using any framework like Express.

IF WE WILL USE EXPRESS FRAMEWORK, it will be like this :- 


const express = require('express');
const app = express();

app.use(express.json());  // 🧠 Parses incoming JSON automatically

app.post('/user', (req, res) => {
    const { username } = req.body;  // ✅ Directly access parsed data
    res.send(`Received data for user: ${username}`);
});

*/