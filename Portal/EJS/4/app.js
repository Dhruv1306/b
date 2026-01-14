const express = require('express');
const app = express();
app.listen(3000, () => { console.log("4th Server Started")});
app.set("view engine", "ejs");

let errorData = {
 errorType: "VALIDATION" | "NOT_FOUND" | "SERVER_ERROR",
 statusCode: number,
 message: string,
 timestamp: Date,
 requestUrl: string
}
app.get('/', (req,res) => { res.render('error-layout', {errorData})});
