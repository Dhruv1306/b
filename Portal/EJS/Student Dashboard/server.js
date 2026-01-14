const express = require('express');
const app = express();
app.listen(3000, () => { console.log("5th server started")});
app.set("view engine", "ejs");

const data = {
    student: {
    name: "John Doe",
    email: "John@example.com",
    role: "admin"
  },
  courses: [
    { title: "Web Development", grade: "A" },
    { title: "Database Systems", grade: "B" },
    { title: "Operating Systems", grade: "D" }
  ],
  notice: "<b>Important Notice</b>"
}

app.get('/', (req,res) => { res.render("St_Dashboard.ejs", {data})});