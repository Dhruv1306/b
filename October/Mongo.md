<div align="center">
	<h1>📚 MongoDB vs Mongoose: Complete Reference & Revision Notes</h1>
	<h3>By Dhruv</h3>
</div>

---

## 🗂️ Quick Comparison Table

|             | Common                              | MongoDB                    | Mongoose             | Notes                                                                             |
| ----------- | ----------------------------------- | -------------------------- | -------------------- | --------------------------------------------------------------------------------- |
| Requirement | express,<br />mongoose              | ObjectId,<br />MongoClient |                      |                                                                                   |
| Connection  | async await,<br />try-catch block   |                            |                      | In MongoDB, necessary to declare DB name.<br />In Mongoose, it isn't necessary.  |
| Needed      | Schema (way, is different in both), |                            | model (after Schema) |                                                                                   |

---

## 1️⃣ What is MongoDB?

- **MongoDB** is a NoSQL, document-oriented database.
- Stores data in flexible, JSON-like documents (BSON).
- Highly scalable, schema-less (no fixed structure required).
- Used for high-performance, large-scale applications.

---

## 2️⃣ What is Mongoose?

- **Mongoose** is an ODM (Object Data Modeling) library for Node.js and MongoDB.
- Provides a schema-based solution to model your application data.
- Adds structure, validation, and powerful features to MongoDB documents.
- Makes CRUD operations easier and more robust.

---

## 3️⃣ Key Concepts & Terminology

### MongoDB

- **Database**: Container for collections.
- **Collection**: Group of documents (like a table in SQL).
- **Document**: Individual record (JSON/BSON object).
- **MongoClient**: Node.js driver to connect and interact with MongoDB.
- **ObjectId**: Unique identifier for documents.

### Mongoose

- **Schema**: Blueprint for documents, defines field types, validation, etc.
- **Model**: Interface for CRUD operations on a collection (created from a schema).
- **Validation**: Built-in and custom rules for data integrity.
- **Middleware**: Functions that run before/after certain operations (e.g., save, update).

---

## 4️⃣ Step-by-Step: Connecting & Using MongoDB (Node.js)

```js
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017/");
await client.connect();
const db = client.db("myDB");
```

- Use `MongoClient` to connect.
- Always specify the database name.
- Collections and documents are created dynamically.

### Example CRUD Operations

- **Insert**: `db.collection("users").insertOne({ name: "Dhruv" })`
- **Find**: `db.collection("users").find().toArray()`
- **Update**: `db.collection("users").updateOne({ id: 1 }, { $set: { salary: 50000 } })`
- **Delete**: `db.collection("users").deleteMany({ salary: { $lt: 50000 } })`

---

## 5️⃣ Step-by-Step: Connecting & Using Mongoose (Node.js)

```js
const mongoose = require("mongoose");
await mongoose.connect("mongodb://localhost:27017/myDB");
```

- Use `mongoose.connect()` to connect.
- Database name is optional (if not given, defaults to "test" or "temp").

### Defining a Schema & Model

```js
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  password: String,
  phone: Number,
  salary: Number,
});
const User = mongoose.model("User", userSchema);
```

### CRUD Example

```js
const newUser = new User({ name: "Dhruv", ... });
await newUser.save();
```

---

## 6️⃣ Differences: MongoDB vs Mongoose

| Feature        | MongoDB (Native)       | Mongoose (ODM)         |
| -------------- | ---------------------- | ---------------------- |
| Schema         | None (schema-less)     | Schema-based, strict   |
| Validation     | Manual, limited        | Built-in, custom       |
| Data Modeling  | Direct JS objects      | Models, schemas        |
| Middleware     | Not available          | Pre/post hooks         |
| Query Syntax   | Native MongoDB queries | Mongoose query helpers |
| Error Handling | Manual                 | Built-in, robust       |
| Relationships  | Manual (populate)      | Built-in (populate)    |
| Use Case       | Quick, flexible        | Structured, safe       |

---

## 7️⃣ Common Patterns & Best Practices

### MongoDB (Native)

- Use `async/await` for all DB operations.
- Always handle errors with try-catch.
- Specify database and collection names.
- Use `ObjectId` for unique document IDs.
- Collections are created automatically when you insert data.

### Mongoose

- Always define a schema for each collection.
- Use validation and custom setters/getters for data integrity.
- Use models for all CRUD operations.
- Use middleware for hooks (e.g., before save).
- Use `.toUpperCase()` or custom setters for case consistency.
- Use custom validators for business rules (e.g., salary multiple of 1000).

---

## 8️⃣ Example: Mongoose Schema with Validation

```js
const userSchema = mongoose.Schema({
  name: {
    type: String,
    set: (v) => v.toUpperCase(),
    required: true,
    unique: true,
    minLength: [3, "Minimum 3 characters are required"],
    maxLength: [15, "Maximum 15 characters can be filled"],
  },
  email: String,
  password: String,
  phone: Number,
  salary: {
    type: Number,
    min: [10000, "Min salary is 10000"],
    validate: {
      validator: (v) => v % 1000 === 0,
      message: "Salary must be a validator of 1000",
    },
  },
});
```

---

## 9️⃣ Express Integration: REST API with Mongoose

```js
const express = require("express");
const app = express();
app.use(express.json());

app.post("/add-employee", async (req, res) => {
  try {
    const newUser = await User(req.body).save();
    res.status(201).json({ status: "Success", user: newUser });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
});
```

- Use `express.json()` for parsing JSON bodies.
- Use async/await and try-catch for error handling.
- Return meaningful status and error messages.

---

## 🔥 Pro Tips & Revision Points

- **MongoDB** is best for quick, flexible, schema-less storage.
- **Mongoose** is best for structured, validated, and robust applications.
- Always use validation and error handling for production apps.
- Use models and schemas for maintainable code.
- Prefer Mongoose for complex business logic and relationships.
- Use MongoDB native for rapid prototyping and simple use cases.

---

## 📖 Further Reading & References

- [Official MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [MongoDB vs Mongoose: When to Use What?](https://www.mongodb.com/developer/products/mongodb/mongoose-vs-mongodb/)

---

## 📝 Summary

- **MongoDB** is a powerful, flexible NoSQL database.
- **Mongoose** adds structure, validation, and modeling to MongoDB for Node.js.
- Use MongoDB for flexibility, Mongoose for structure and safety.
- Both can be integrated with Express.js for building RESTful APIs.

---

`<small>`✨ Happy Learning & Revision! ✨`</small>`
