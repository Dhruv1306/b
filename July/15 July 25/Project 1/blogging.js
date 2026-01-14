const express = require('express');

const app = express();

app.listen(3000);

app.get('/blog/:year/:month/:slug',(req,res)=>{
    const user = req.params;
    const data = [];

    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

    const monthName = monthNames[parseInt(user.month) - 1];

    const result = `Viewing blog post: "${user.slug}"<br>Published: ${monthName}, ${user.year}`;
    data.push(result);
    res.send(data.join('\n'));
});