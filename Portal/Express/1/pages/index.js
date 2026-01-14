const express = require('express');
const app = express();
const path = require('path');
app.listen(3000, () => { console.log("Server Started")})

app.use(express.static(path.join(__dirname,'pages')))
app.use(express.urlencoded({extended:true}))
app.get('/', (req,res) => { res.sendFile('/1.html',{root: __dirname})})
app.get('/contact', (req,res) => { res.sendFile('./contact.html', {root: __dirname})})
app.get('/service', (req,res) => { res.sendFile('./service.html', {root: __dirname})})
app.get('/about', (req,res) => { res.sendFile('./about.html', {root: __dirname})})

app.use((req,res) => { res.send("404 NOT FOUND")})