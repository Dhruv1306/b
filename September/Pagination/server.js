const express = require('express');
const app = express();
const products = require("./products.js");

app.listen(3000, () => {console.log("Server Started")});

// const products = [
//     {id:1, productName: "Item_1"},
//     {id:2, productName: "Item_2"}
// ];

app.get('/', (req,res) => { res.send("<h1>Hello it's about Pagination!!</h1>"); console.log(products); });

app.get('/items', (req,res)=>{
    // Parameters ( in query form )
    const page = parseInt(req.query.page) ||  1    // By default, it's value is 1.
    const limit = parseInt(req.query.limit) ||  10   // By default, it's value is 10.

    // Calculation
    const startIndex = (page - 1) * limit;               
    const endIndex = (page * limit) ;           // If product's "id" is starting from "1"
    // const endIndex = (page * limit) - 1;           // If product's "id" is starting from "0"

    // Prepare Result
    const result = {}  // An Empty Object

    // Current page data in slice
    result.data = products.slice(startIndex, endIndex);

    if(endIndex < products.length){
        result.next = {page : page + 1};
    }
    if(startIndex > 0){
        result.prev = {page : page - 1};
    }

    // Send the data
    res.json(result);
});

// URL :- http://localhost:3000/items?page=1&limit=5   
// What's necessary is "page" query, "limit" query is optional. 