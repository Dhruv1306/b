const express = require("express");
const app = express();
const { ObjectId } = require("bson"); // bson :- Binary JSON     // Node understands JSON       MongoDB understands bson

app.listen(3000, () => {
  console.log("St_Management_System's Server started");
});
app.set("view engine", "ejs");
app.use(express.static("public")); // Serve static files from public directory
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { MongoClient } = require("mongodb"); // MongoClient'll make an instance of db to node connection

let db;

// Making a fn.to connect mongodb   // Note :- This database is a 3rd party thing. And with 3rd party things we'll use "async & await".
const connectDB = async () => {
  try {
    let client = new MongoClient("mongodb://localhost:27017/"); // It'll always return a Promise.
    //below line will connect mongodb to node
    await client.connect();
    db = client.db("SchoolManagementSystem"); // Name of the DB // NOTE : YOU CAN'T GIVE SPACE IN BETWEEN.
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

// Utility route to fix existing serial number gaps (call this once to fix current data)
app.get("/fix-numbering", async (req, res) => {
  try {
    // Get all students sorted by their current index
    const allStudents = await db
      .collection("class")
      .find()
      .sort({ index: 1 })
      .toArray();

    // Renumber them sequentially starting from 1
    for (let i = 0; i < allStudents.length; i++) {
      const newIndex = i + 1;
      await db
        .collection("class")
        .updateOne({ _id: allStudents[i]._id }, { $set: { index: newIndex } });
    }

    console.log(`Fixed numbering for ${allStudents.length} students`);
    res.send(
      `✅ Fixed serial numbering for ${allStudents.length} students. <a href="/">Go back to home</a>`
    );
  } catch (error) {
    console.error("Error fixing numbering:", error);
    res.status(500).send("Error fixing numbering");
  }
});

app.get("/", async (req, res) => {
  // Always fetch data sorted by index to maintain proper order
  const data = await db.collection("class").find().sort({ index: 1 }).toArray();
  res.render("index.ejs", { data, appliedFilter: null });
});

app.post("/add-student", async (req, res) => {
  try {
    // Find the student with the highest index to get the next sequential number   // Means the last student.
    const lastStudent = await db
      .collection("class")
      .findOne({}, { sort: { index: -1 } }); // 1st parameter : query      2nd parameter : projection       // Here, we are doing sorting in Descending Order, cause of "-1".

    const nextIndex =
      lastStudent && lastStudent.index ? lastStudent.index + 1 : 1;

    // Add the index to the student data
    const studentData = {
      index: nextIndex,
      ...req.body, // Spread operator to include all form data
    };

    // const dbresp = await db.collection("class").insertOne(req.body);
    const dbresp = await db.collection("class").insertOne(studentData);
    console.log(dbresp); // to know that we have get our data
    res.redirect("/");
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).send("Error adding student");
  }
});

app.get("/delete-st/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // First, get the student to be deleted to know their index
    const studentToDelete = await db
      .collection("class")
      .findOne({ _id: new ObjectId(userId) });

    if (!studentToDelete) {
      return res.status(404).send("Student not found");
    }

    const deletedIndex = studentToDelete.index;

    // Delete the student
    await db.collection("class").deleteOne({ _id: new ObjectId(userId) });

    // Update all students with index greater than the deleted student's index
    // Decrease their index by 1 to fill the gap
    await db.collection("class").updateMany(
      { index: { $gt: deletedIndex } }, // Find students with index greater than deleted student
      { $inc: { index: -1 } } // Decrease their index by 1
    );

    console.log(
      `Deleted student with index ${deletedIndex} and renumbered remaining students`
    );
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).send("Error deleting student");
  }
});

app.get("/edit-st/:id", async (req, res) => {
  const userId = req.params.id;
  const studentData = await db
    .collection("class")
    .findOne({ _id: new ObjectId(userId) });
  res.render("edit.ejs", { student: studentData });
});

app.post("/update-student/:id", async (req, res) => {
  const userId = req.params.id;
  await db
    .collection("class")
    .updateOne({ _id: new ObjectId(userId) }, { $set: req.body });
  res.redirect("/");
});

app.post("/filter", async (req, res) => {
  try {
    const { filterType, filterValue } = req.body;

    // Check if marks are stored as strings or numbers in your database
    const filterVal = filterValue ? parseInt(filterValue) : null; // Used if the marks are stored in the Int form.

    let filter = {};

    // Build MongoDB filter based on selected filter type
    switch (filterType) {
      case "minMarks":
        // Try both string and number comparison
        filter = {
          $or: [
            { marks: { $gte: filterVal } }, // If marks are numbers
            { marks: { $gte: filterValue } }, // If marks are strings
          ],
        };
        break;

      case "maxMarks":
        filter = {
          $or: [
            { marks: { $lte: filterVal } },
            { marks: { $lte: filterValue } },
          ],
        };
        break;

      case "greaterThan":
        filter = {
          $or: [{ marks: { $gt: filterVal } }, { marks: { $gt: filterValue } }],
        };
        break;

      case "lessThan":
        filter = {
          $or: [{ marks: { $lt: filterVal } }, { marks: { $lt: filterValue } }],
        };
        break;

      case "pass":
        // Students with marks >= 40 (passing marks)
        filter = {
          $or: [
            { marks: { $gte: 35 } }, // If marks are numbers
            { marks: { $gte: "35" } }, // If marks are strings
          ],
        };
        break;

      case "fail":
        // Students with marks < 40 (failing marks)
        filter = {
          $or: [
            { marks: { $lt: 35 } }, // If marks are numbers
            { marks: { $lt: "35" } }, // If marks are strings
          ],
        };
        break;

      default:
        filter = {}; // No filter if invalid type
    }

    // Fetch filtered data from database, sorted by index
    const data = await db
      .collection("class")
      .find(filter)
      .sort({ index: 1 })
      .toArray();
    console.log("Filtered Data Count:", data.length);

    // Render the page with filtered data
    const appliedFilter = filterValue
      ? `${filterType}: ${filterValue}`
      : filterType;
    res.render("index.ejs", { data, appliedFilter });
  } catch (error) {
    console.error("Error filtering data:", error);
    res.status(500).send("Error filtering data");
  }
});
