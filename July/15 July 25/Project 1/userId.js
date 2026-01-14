const users = [
  { id: '101', name: 'Alice', age: 25 },
  { id: '102', name: 'Bob', age: 30 },
  { id: '103', name: 'Charlie', age: 22 }
];

const express = require('express');

const app = express();

app.listen(3000);

app.get('/user/:id',(req,res)=>{
    const data = req.params.id;

    const user = users.find((user) => user.id === data);

    if(!user){
        res.statusCode = 404;
        res.send({message : "User Not Found"});
    }else{
        res.json(user);
    }

})