const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Secret key for JWT
const JWT_SECRET = 'secret_jwt';
const JWT_EXPIRY = '10m'; // token valid for 10 minutes

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Hardcoded users (for demo)
const users = [
  { username: "Mohan", password: "secret" },
  { username: "Raghav", password: "secret" },
  { username: "Warner", password: "secret" }
];

// Middleware to protect routes
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect('/login');
  }
}

// Login Page
app.get('/login', (req, res) => {
  // If already logged in, redirect to profile
  if (req.cookies.token) {
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
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user in hardcoded array
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Generate JWT token
    const token = jwt.sign({
      username: user.username,
      loginAt: Date.now()
    }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    // Store JWT in cookie
    res.cookie('token', token, { httpOnly: true });
    return res.redirect('/profile');
  }

  res.send('<h3>Invalid credentials. <a href="/login">Try again</a></h3>');
});

// Protected Profile Page
app.get('/profile', authMiddleware, (req, res) => {
  const username = req.user.username;
  const loginTime = req.user.loginAt;
  const timeSinceLogin = Math.floor((Date.now() - loginTime) / 1000);
  const token = req.cookies.token;

  res.send(`
    <h1>Welcome to Your Profile</h1>
    <p><b>Username:</b> ${username}</p>
    <p><b>Time since login:</b> ${timeSinceLogin} seconds</p>
    <p><b>JWT Token:</b> ${token}</p>
    <a href="/logout">Logout</a>
  `);
});

// Logout
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));