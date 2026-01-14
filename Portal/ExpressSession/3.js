const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const session = require("express-session");
app.listen(3000, () => {
  console.log("Server Started");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "BEE")));
app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 30, // 30 min
    },
  })
);

const isAuthenticated = (req, res, next) => {
  if (req.session.user) return next();
  else return res.send(`<h3>Your session has expired or you are not logged in. Please <a href='/login'>login</a> again.</h3>`);
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

  if (user.role == "admin") return res.redirect("/dashboard/admin");
  else return res.redirect("/dashboard/user");
});

app.get("/dashboard/:role", isAuthenticated, isAuthorized, (req, res) => {
  const role = req.params.role;
  res.sendFile(`./${role}/Dashboard.html`, { root: __dirname });
});
