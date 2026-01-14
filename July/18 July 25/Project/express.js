const express = require('express');
const app = express();

app.listen(3000, ()=> {
    console.log("Server Started");
});

app.get('/contact',(req,res) => {
    res.sendFile('./contact.html', {root:'./pages'});
})

app.get('/services',(req,res) => {
    res.sendFile('./services.html', {root:'./pages'});
})

app.get('/about',(req,res) => {
    res.sendFile('./about.html', {root:'.'});
})