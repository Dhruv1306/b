// JWT based Authorization and authentication

const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const {
    PORT = 5050,
    JWT_SECRET = 'secret_jwt', // Secret key for JWT
    JWT_EXPIRY = '2h' // Token expiry
} = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // parse cookies

// Load users from user.json
const users = JSON.parse(fs.readFileSync("user.json", "utf-8"));

// Middleware to check JWT token
const checkJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login?error=Please%20login");

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // attach user info to req
        next();
    } catch (err) {
        return res.redirect("/login?error=Invalid%20or%20expired%20token");
    }
};

// Middleware to check role
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).send("<h1>Unauthorized Access</h1>");
        }
    }
};

// Redirect if logged in
const redirectHome = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return res.redirect(decoded.role === "admin" ? "/admin" : "/user");
        } catch { }
    }
    next();
};

// Redirect if not logged in
const redirectLogin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");
    try {
        jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        return res.redirect("/login");
    }
};

// Home route
app.get("/", (req, res) => {
    const token = req.cookies.token;
    let user = null;
    if (token) {
        try {
            user = jwt.verify(token, JWT_SECRET);
        } catch { }
    }
    res.send(`
        <h1>Welcome</h1>
        ${user ? `
            <a href="${user.role === 'admin' ? '/admin' : '/user'}">Home</a>
            <form action="/logout" method="POST"><button>Logout</button></form>
        ` : `
            <a href="/login">Login</a>
        `}
    `);
});

// Login page
app.get("/login", redirectHome, (req, res) => {
    const error = req.query.error;
    res.send(`
        <h1>Login</h1>
        ${error ? `<p style="color:red;">${error}</p>` : ""}
        <form action="/login" method="POST">
          <label>Email</label><input type="email" name="email"/><br>
          <label>Password</label><input type="password" name="password"/><br>
          <input type="submit"/>
       </form>
    `);
});

// Admin page
app.get("/admin", checkJWT, checkRole("admin"), (req, res) => {
    res.send('<h1>Admin Page</h1>');
});

// User page
app.get("/user", checkJWT, checkRole("user"), (req, res) => {
    res.send('<h1>User Page</h1>');
});

// Login POST - generate JWT
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        const token = jwt.sign({
            username: user.name,
            role: user.role,
            loginAt: Date.now()
        }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

        res.cookie('token', token, { httpOnly: true });
        return res.redirect(user.role === "admin" ? "/admin" : "/user");
    }
    res.redirect('/login?error=Invalid%20credentials');
});

// Logout
app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});