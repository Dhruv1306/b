const express = require('express');
const router = express.Router();

const users = [                            // Dummy user data
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

router.get('/', (req,res) => { res.json(users); });      // return list of users

router.get('/:id', (req,res) => {                 // return user based on id
    const ID = req.params.id;
    const user = users.find(user => user.id == ID);
    if(!user) return res.status(404).send("User not found");
    return res.json(user);
});

module.exports = router;

//Use "res.json()" when you're returning structured data like objects or arrays. Use "res.send()" for strings, HTML, or when you don’t care about the format.