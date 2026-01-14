const express = require('express');
const app = express();
app.listen(3000, ()=> { console.log("Server Started")});

app.get('/blog/:year/:month/:slug', (req,res) => {
    const bodyData = req.params;
    const Months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const month = Months[(bodyData.month) - 1];
    const output = `Viewing blog post: "${bodyData.slug}" <br>Published: ${month}, ${bodyData.year}`;
    res.send(output);
});