const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('greeting', {
        userName: 'Dhruv',
        isLoggedIn: true // flip to false to test the other branch
    });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});