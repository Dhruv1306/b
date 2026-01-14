const express = require('express');
const router = express.Router();

let comments = [     
   {id: 1001, comment:"1st comment"},
   {id: 1002, comment:"2nd comment"},
   {id: 1003, comment:"3rd comment"}
];

router.get('/', (req,res) =>{ res.json(comments)});
router.get('/:id', (req,res) => {
    const ID = req.params.id;
    const comment = comments.find(c => c.id == ID);
    if(!comment) return res.status(404).send("No comment found");
    return res.json(comment);
});
router.post('/:id', (req,res)=>{
    const ID = parseInt(req.params.id);
    const newComment = {
        id:  Date.now(),
        comment: req.params.comment
    };
    comments.push(newComment);
    res.status(201).json(newComment);
});
router.delete('/:id', (req,res) => {
    const ID = parseInt(req.params.id);
    const index = comments.findIndex(c => c.id === ID);
    if( index === -1) return res.status(404).send("No Comment Found");
    const deleteComment = comments.splice(index, 1);
    res.json(deleteComment[0]);
});
module.exports = router;