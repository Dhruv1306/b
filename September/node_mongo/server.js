// Connecting MongoDb with Node.js
const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("Server Started");
});
const { MongoClient } = require("mongodb"); // MongoClient'll make an instance of db to node connection

let db;

// Making a fn.to connect mongodb   // Note :- This database is a 3rd party thing. And with 3rd party things we'll use "async & await".
const connectDB = async () => {
  try {
    let client = new MongoClient("mongodb://localhost:27017/"); // It'll always return a Promise.
    //below line will connect mongodb to node
    await client.connect();
    db = client.db("myDB");   // Name of the DB
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

app.get("/", async (req, res) => {
  const dbRes = await db.collection("users").insertOne({ name: "Dhruv" }); // This is our Asynchronous Task. Therefore we'll use Async & Await.
  res.send(dbRes);
});

// To enter 5 data id, name, salary, age

app.get("/enter5data", async (req, res) => {
  const dbresp = await db.collection("users").insertMany([
    { id: 1, name: "Dhruv", salary: 100000, age: 20 },
    { id: 2, name: "Gautam", salary: 100000, age: 20 },
    { id: 3, name: "Dweep", salary: 100000, age: 20 },
    { id: 4, name: "abc", salary: 60000, age: 25 },
    { id: 5, name: "xyz", salary: 50000,age: 31 },
  ]);

  res.send(dbresp);
  // res.redirect('/view');
});

// to view all the users

app.get("/view", async (req, res) => {
  const dbresp = await db.collection("users").find().toArray();
  res.send(dbresp);
});

// to view specific user by ID or name (intelligent detection)

app.get("/view/:param", async (req, res) => {
  const param = req.params.param;
  let dbresp;

  // Check if parameter is a number (ID) or string (name)
  if (!isNaN(param) && !isNaN(parseInt(param))) {
    // It's a number, search by ID
    const userId = Number(param);
    dbresp = await db.collection("users").find({ id: userId }).toArray();
  } else {
    // It's a string, search by name
    dbresp = await db.collection("users").find({ name: param }).toArray();
  }

  res.send(dbresp);
});

/* What i'm doing before. I am creating 2 different routes, one for searching with name & the other with id.

But, i am getting error in that, when i am trying to access using the 2nd route. 

 -> -> -> Looking at your selected code, I can see there's a routing conflict issue. You have two routes that will clash with each other:

app.get('/view/:id', ...) on line 53
app.get('/view/:name', ...) on line 59
The problem is that Express.js processes routes in the order they are defined. When you try to access /view/Dhruv (expecting it to match by name), Express will match it with the first route /view/:id and try to convert "Dhruv" to a number, which will fail.

Let me check the current behavior by examining the routes more closely:

Read server.js, lines 50 to 65

The issue is exactly what I suspected. Here are the problems and solutions:

Problems:
Route Conflict: Both routes use the same pattern /view/:param, so the first one (:id) will always match first
Type Conversion: When you try /view/Dhruv, it gets caught by the :id route and Number("Dhruv") returns NaN
Solutions:
Here are a few ways to fix this:

Option 1: Use different route patterns (Recommended)

server.js+2-2
Now your routes will work as follows:

To view by ID: GET /view/id/1
To view by name: GET /view/name/Dhruv
To view all users: GET /view


Alternative Option 2: Use a single intelligent route

If you prefer to keep the original pattern, I can show you how to create a single route that detects whether the parameter is a number or string:

server.js+15-12
Now you can use:

GET /view/1 (searches by ID)
GET /view/Dhruv (searches by name)
GET /view (shows all users)
The route will automatically detect whether you're passing an ID (number) or a name (string) and query the appropriate field in your MongoDB collection.

Test your server now - both approaches should work correctly!

*/

// To get the users against salary

app.get("/view/salary/:salary", async (req, res) => {
  const userSalary = Number(req.params.salary);
  const dbresp = await db
    .collection("users")
    .find({ salary: { $gt: userSalary } })
    .toArray();
  res.send(dbresp);
});

// ************************ Till now we have done, Insertion & View ***************************
// ************************ Now let's do, Update & Delete *****************************************

// update any data

// In this we need to give the new salary in the route itself.
app.get("/update_usersalary/:id/:newsalary", async (req, res) => {
  const userId = Number(req.params.id);
  const newSalary = Number(req.params.newsalary);
  const dbresp = await db
    .collection("users")
    .updateOne({ id: userId }, { $set: { salary: newSalary } });
  res.redirect("/view");
});

// My self-written code
app.get("/update_usersalary/:id", async (req, res) => {
  const userId = Number(req.params.id);
  const newSalary = 50000;
  const dbresp = await db
    .collection("users")
    .updateOne({ id: userId }, { $set: { salary: newSalary } });
  res.redirect("/view");
});

// Delete data

// app.get("/delete_user", async (req, res) => {
//   const delData = await db.collection("users").deleteMany({ salary: { $lt: 50000 } });
//   res.redirect("/view");
// });


// Creating an intelligent block  which deletes the users whose salary is less than 50,000 and if the salary isn't present for them. 
app.get("/delete_user", async (req, res) => {
  const delData = await db.collection("users").deleteMany({ $or : [{salary: { $lt: 55000 }}, {salary: {$exists: false}} ]});
  res.redirect("/view");
});