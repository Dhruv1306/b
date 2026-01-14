const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 30 } // 30 minutes
  })
);

// Hardcoded users
const users = [
  { username: "Mohan", password: "secret" },
  { username: "Raghav", password: "secret" },
  { username: "Warner", password: "secret" }
];

// Middleware: check if session is valid
function authMiddleware(req, res, next) {
  if (req.session.username && req.session.loginTime) {
    return next();
  }
  // Redirect unauthorized users to login
  res.send(`
    <script>
      alert("Your session is invalid or expired. Please login again.");
      window.location.href = "/login";
    </script>
  `);
}

// Login page
app.get("/login", (req, res) => {
  if (req.session.username) {
    return res.redirect('/profile');
  }
  res.send(`
    <h1>Login Page</h1>
    <form method="POST" action="/login">
      <label>Username:</label>
      <input type="text" name="username" required><br><br>

      <label>Password:</label>
      <input type="password" name="password" required><br><br>

      <button type="submit">Login</button>
    </form>
  `);
});

// Handle login POST
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.username = user.username;
    req.session.loginTime = Date.now(); // store login timestamp
    return res.redirect('/profile');
  }

  res.send("<h3>Invalid credentials. <a href='/login'>Try again</a></h3>");
});

// Protected Profile route
app.get("/profile", authMiddleware, (req, res) => {
  const username = req.session.username;
  const sessionId = req.sessionID;
  const timeSinceLogin = Math.floor((Date.now() - req.session.loginTime) / 1000); // in seconds

  res.send(`
    <h1>Welcome to Your Profile</h1>
    <p><b>Username:</b> ${username}</p>
    <p><b>Time since login:</b> ${timeSinceLogin} seconds</p>
    <p><b>Session ID:</b> ${sessionId}</p>
    <a href="/logout">Logout</a>
  `);
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send("Error logging out");
    res.redirect("/login");
  });
});

// Start server
app.listen(3030, () => {
  console.log("Server running at http://localhost:3030");
});