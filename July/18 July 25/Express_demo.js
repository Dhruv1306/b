const express = require('express');
const app = express();

app.listen(3000, ()=> {
    console.log("Server started.");
})

/* Routing  methods (4 types) :- 1) app.get()   2)app.post    3) app.put()     4)app.delete()
  These are also called Middlewares */

app.get('/', (req,res) => {    
    res.send("Hello Class"); // 1) It will sends the data directly, of any type.    2) The "sends" method sets the header automatically according to its Content-Type.
})