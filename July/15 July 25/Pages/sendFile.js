const express = require('express');

const app = express();

app.listen(3000);

app.get('/service',(req,res)=>{
    res.sendFile('./service.html',{root : '.'});
})

app.get('/about',(req,res)=>{
    res.sendFile('./about.html',{root : '.'});
})

app.get('/contact',(req,res)=>{
    res.sendFile('./contact.html',{root : '.'});
})