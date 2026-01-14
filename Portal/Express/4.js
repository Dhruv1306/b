const express = require('express');
const app = express();

app.listen(3000, () => { console.log("Server Started")});

app.get('/greet', (req,res) => {
    const lang = req.query.lang;
    if(lang == 'en'){return res.send("Hello");}
    else if(lang == 'fr'){ return res.send("Bonjour");}
    else if(lang == 'hi'){ return res.send("Namaste");}
    else{ return res.send("How's the JOSH!!");}
});