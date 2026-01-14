const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.listen(3000, () => { console.log("Server Started")});
app.use(express.static(path.join(__dirname, './public')));  // 'public' -> tells express to serve files from "public" folder

app.get('/', (req,res) => {
    res.sendFile('./index.html', {root: __dirname});
});

// serve static assests