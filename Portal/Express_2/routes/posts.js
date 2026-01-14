const express = require('express');
const router = express.Router();

let posts = [                       // Dummy Data
    {id:101, title:"Hii"},
    {id:102, title:"Hello"},
    {id:103, title:"Namaste"}
];

router.get('/', (req,res) => { res.json(posts);});
router.get('/:id', (req,res) => {
    const ID = parseInt(req.params.id);
    const post = posts.find(post => post.id == ID);              // Doing Normal COMPARING 
    if(!post) return res.status(404).send("No Post Found");
    return res.json(post);
});

router.post('/', (req,res) => {
    const newPost = {
        id: Date.now(),    // simple unique ID
        title: req.body.title
    };
    posts.push(newPost);               // updating our "posts" data
    res.status(201).json(newPost);    // Sending the new added user data to the browser 
});

router.delete('/:id', (req,res) => {             // As our data is presented in ARRAY form inside an OBJECT. Therefore, during deletion we will use "INDEXING". 
    const ID = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === ID);                 // Doing STRICT Comparing
    if (index === -1) return res.status(404).send("Post not found");  // This prevents the splice(-1, 1) accidental deletion bug.
    const deletedPost = posts.splice(index,1);
    res.json(deletedPost[0]);
});

module.exports = router;

/* 
* `splice()` changes the **original array** (not a copy).
* First argument → `index` → the starting position to remove elements.
* Second argument → `1` → how many elements to remove from that position.
*/