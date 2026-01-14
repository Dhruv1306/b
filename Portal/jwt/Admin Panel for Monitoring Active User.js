const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Session setup (30 minutes expiry)
const sessionMiddleware = session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 30 } // 30 minutes
});
app.use(sessionMiddleware);

// ---- In-memory session tracker ----
const activeSessions = {};

// Hardcoded users with roles
const users = [
  { username: "Mohan", password: "secret", role: "user" },
  { username: "Raghav", password: "secret", role: "user" },
  { username: "Warner", password: "secret", role: "user" },
  { username: "Chandan", password: "secret", role: "admin" }
];

// Middleware: check if user is logged in
function authMiddleware(req, res, next) {
  if (req.session.username && req.session.loginTime) {
    return next();
  }
  res.send(`
    <script>
      alert("Your session has expired. Please login again.");
      window.location.href = "/login";
    </script>
  `);
}

// Middleware: check if user is admin
function adminMiddleware(req, res, next) {
  if (req.session.username && req.session.role === "admin") {
    return next();
  }
  res.status(403).send("<h3>Access denied. Admins only.</h3>");
}

// Login page
app.get("/login", (req, res) => {
  if (req.session.username) {
    return req.session.role === "admin" ? res.redirect("/admin") : res.redirect("/profile");
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
    req.session.role = user.role;
    req.session.loginTime = new Date();

    // Track session as a "token"
    activeSessions[req.sessionID] = {
      username: user.username,
      role: user.role,
      loginTime: req.session.loginTime,
      expiresAt: new Date(Date.now() + req.session.cookie.maxAge)
    };

    return user.role === "admin" ? res.redirect("/admin") : res.redirect("/profile");
  }

  res.send("<h3>Invalid credentials. <a href='/login'>Try again</a></h3>");
});

// Profile page (normal users)
app.get("/profile", authMiddleware, (req, res) => {
  if (req.session.role === "admin") return res.redirect("/admin"); // Admins should go to admin panel
  const username = req.session.username;
  const sessionId = req.sessionID;
  const timeSinceLogin = Math.floor((Date.now() - req.session.loginTime) / 1000); // seconds

  res.send(`
    <h1>User Profile</h1>
    <p><b>Username:</b> ${username}</p>
    <p><b>Time since login:</b> ${timeSinceLogin} seconds</p>
    <p><b>Session ID:</b> ${sessionId}</p>
    <a href="/logout">Logout</a>
  `);
});

// Admin panel: view all active sessions
app.get("/admin", adminMiddleware, (req, res) => {
  let tableRows = "";

  for (let sid in activeSessions) {
    const s = activeSessions[sid];
    tableRows += `
      <tr>
        <td>${s.username}</td>
        <td>${s.role}</td>
        <td>${new Date(s.loginTime).toLocaleString()}</td>
        <td>${new Date(s.expiresAt).toLocaleString()}</td>
      </tr>
    `;
  }

  res.send(`
    <h1>Admin Panel - Active Sessions</h1>
    <table border="1" cellpadding="8">
      <tr>
        <th>Username</th>
        <th>Role</th>
        <th>Token Issue Time</th>
        <th>Token Expiration Time</th>
      </tr>
      ${tableRows || "<tr><td colspan='4'>No active sessions</td></tr>"}
    </table>
    <br>
    <a href="/logout">Logout</a>
  `);
});

// Logout
app.get("/logout", (req, res) => {
  delete activeSessions[req.sessionID]; // remove session from tracker
  req.session.destroy(err => {
    if (err) return res.send("Error logging out");
    res.redirect("/login");
  });
});

// Start server
app.listen(3030, () => {
  console.log("Server running at http://localhost:3030");
});