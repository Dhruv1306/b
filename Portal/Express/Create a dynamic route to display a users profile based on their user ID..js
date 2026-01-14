const express = require('express');
const app = express();
app.listen(3000, ()=> { console.log("Server Started")});

const users = [
  { id: '101', name: 'Alice', age: 25 },
  { id: '102', name: 'Bob', age: 30 },
  { id: '103', name: 'Charlie', age: 22 }
];

app.get('/', (req,res) => { res.send("Hello Nikhil")})

app.get('/user/:id', (req,res) => {
    const ID = req.params.id;
    const user = users.find(user => user.id == ID);
    if(!user){ return res.send("User not found");}
    return res.send(user);
})