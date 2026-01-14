const express = require('express');

const app = express();

app.listen(3000);

app.get('/home',(req,res)=>{
    res.sendFile('./public/home.html',{root : '.'}); 
});

app.use('/public',express.static("./public"));