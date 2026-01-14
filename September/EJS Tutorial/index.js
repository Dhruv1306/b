const express = require('express');
const app = express();
app.listen(3000, () => { console.log("Server Started")});

// ejs configuration
app.set("view engine", "ejs");    // It will implement ejs folder in my server 

const data = {
    name : "Dhruv",
    age : 20,
    password : "secret"
}

app.get("/", (req,res) => { 
    // res.send("<h1>Hello World!!</h1>");
    // res.render("index.ejs", {name: "Dhruv"});   // 1st param : file name      2nd param : data & we need to give it in object from
    res.render("index.ejs", {data});
});

/*
    "res.render("index.ejs", {name: "Dhruv"});"    :-    This line is used to render a dynamic HTML page using the EJS templating engine. Here, 

            a) .render(): A method that tells Express to render a view template (like an .ejs file)

            b) "index.ejs": The name of the EJS template file located in your "views" folder. You don’t need to specify the full path if you’ve already set views in your Express config.

            c) { name: "Dhruv" }: This is the data object you're passing to the template. Inside index.ejs, you can access "name" using <%= name %>.

🖼️ What Happens Behind the Scenes

- Express looks for "index.ejs" in the "views" folder.
- It injects the value "Dhruv" wherever <%= name %> appears in the template.
- The final HTML is generated and sent to the browser

*/