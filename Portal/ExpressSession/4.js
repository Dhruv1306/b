const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const session = require("express-session");
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
app.listen(3000, () => { console.log("Server Started"); });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "BEE")));
app.use(session({
    secret: "key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 1,
    }
  })
);

// In-memory session store for demonstration (not for production)
const activeSessions = {};

const isAuthenticated = (req, res, next) => {
  if (req.session.user) return next();
  else
    return res.send(
      `<h3>Your session has expired or you are not logged in. Please <a href='/login'>login</a> again.</h3>`
    );
};
const isAuthorized = (req, res, next) => {
  if (req.session.user && req.session.user.role == req.params.role)
    return next();
  else {
    res.redirect("/login");
  }
};

app.get("/login", (req, res) => {
  res.sendFile("./login.html", { root: __dirname });
});

app.post("/login", (req, res) => {
  const bodyData = req.body;
  const users = JSON.parse(fs.readFileSync("./user.json", "utf-8"));
  const user = users.find((user) => user.username === bodyData.username);
  if (!user) return res.send("No user found");
  if (user.password != bodyData.password) return res.send("Password is wrong");

  req.session.user = {
    ...user,
    role: user.role == "admin" ? "admin" : "user",
    loginTime: Date.now(),
  };

  // Store session info in activeSessions
  activeSessions[req.sessionID] = {
    username: user.username,
    loginTime: req.session.user.loginTime,
    expiresAt: req.session.cookie.expires,
    role: req.session.user.role,
  };

  return user.role == "admin" ? res.redirect("/dashboard/admin") : res.redirect("/dashboard/user");
});

app.get("/dashboard/:role", isAuthenticated, isAuthorized, (req, res) => {
  const role = req.params.role;
  res.sendFile(`./${role}/Dashboard.html`, {root:__dirname});
});

// Remove session on logout
app.get("/logout", (req, res) => {
  delete activeSessions[req.sessionID];
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// API route to get active sessions as JSON
app.get("/api/sessions", isAuthenticated,(req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  res.json(Object.values(activeSessions));
});