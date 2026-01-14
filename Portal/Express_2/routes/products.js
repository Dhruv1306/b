const express = require('express');
const router = express.Router();

let products = [                       // Dummy Data
    {id:101, product:"Keyboard", category: "accessories"},
    {id:102, product:"Mouse", category: "accessories"},
    {id:103, product:"RAM", category: "parts"}
];

router.get('/', (req,res) => {
    res.json(products);
})

router.get('/:category/:id', (req,res) => {
    const { category, id } = req.params;      // this id we are getting from (req.params.id) is also in the form of String. 
    const filtering = products.filter(f => f.category == category)      // we are comparing it with the "req.params.category". 
    const product = filtering.find(p => p.id === Number(id));  // As "id" is in String form therefore we need to convert it to Number. 
    if(!product) return res.send("product doesn't exist");
    return res.json(product);
})

module.exports = router;

/* THE FILTRATION :

    - It compares each product's category with the category from the URL (req.params.category).
    - It returns a new array containing only products that match the requested category.

*/