const express = require('express');
const app = express();
app.listen(3000, () => { console.log("Server Started")});

const products = require("../../routes/products");

app.use('/api/products', products);