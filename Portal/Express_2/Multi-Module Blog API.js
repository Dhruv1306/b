const express = require('express');
const app = express();
app.listen(3000,()=> { console.log("Server Started")});

app.use(express.json());              //  This middleware is used to parse JSON Data          // 👈 Needed for POST requests

const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req,res) =>{ res.send("Good Coder!!")});
 

/* 
app.use(express.json());   

        - Parses incoming requests with JSON payloads
        - Required when clients send data as "application/json"

app.use(express.urlencoded{extended: true});

        - Parses incoming requests with URL-encoded payloads
        - Required when clients send data as "application/x-www-form-urlencoded"
*/