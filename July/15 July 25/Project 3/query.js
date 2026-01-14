const express = require('express');

const app = express();

app.listen(3000);

app.get('/greet', (req, res) => {
    const lang = req.query.lang;
    if (lang === "fr") {
        res.send("<h1>Bonjour</h1>");
    } else if (lang === "hi") {
        res.send("<h1>Namaste</h1>");
    } else {
        res.send("<h1>Hello</h1>");
    }
});