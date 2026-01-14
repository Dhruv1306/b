const express = require('express');
const app = express();
app.listen(3000, () => console.log("3rd server started"));
app.set("view engine", "ejs");

const students = [
 { name: "Rahul", marks: { math: 80, science: 90, english: 70 } },
 { name: "Priya", marks: { math: 60, science: 75, english: 85 } },
 { name: "Aman", marks: { math: 95, science: 88, english: 92 } }
];

app.get('/', (req,res) => { res.render('student-report', {students})});  // Not necessary to write the file extension name.
