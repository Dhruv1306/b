const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // connect-mongo v4
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const authRouter = require("./routes/auth"); // auth routes
const adminRouter = require("./routes/admin"); // admin routes

const app = express();

// connect to MongoDB for Mongoose and session store
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/uni_assignment";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.error("Mongoose connect error:", err));

// view engine setup (EJS)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// session middleware using connect-mongo to persist sessions in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change_this_secret", // set secure secret in production
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 2 }, // 2 hours
    store: MongoStore.create({ mongoUrl: MONGO_URI }), // store sessions in MongoDB
  })
);

// mount routes
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

// default route -> redirect to login or dashboard if already logged in
app.get("/", (req, res) => {
  if (req.session && req.session.user) return res.redirect("/admin/dashboard");
  return res.redirect("/auth/login");
});

// (optional) use simpler connect call to avoid deprecation warnings in recent Mongoose:
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.error("Mongoose connect error:", err));

// Start server when running this file directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
