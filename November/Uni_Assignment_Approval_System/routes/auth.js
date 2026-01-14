const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Render login page
router.get("/login", (req, res) => {
  // If already logged in, go to dashboard
  if (req.session && req.session.user) return res.redirect("/admin/dashboard");

  // Ensure we always pass 'email' and 'error' to the template to avoid "not defined" errors
  res.render("login", { error: null, email: "" }); // <-- always pass email
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body; // requires body-parser or express.urlencoded

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).render("login", { error: "User doesn't exist" });
    if (password != user.password)
      return res.status(401).render("login", { error: "Incorrect Password" });

    req.session.user = user;

    return res.redirect("/admin/dashboard");
  } catch (err) {
    console.error("Login error: ", err);
    return res
      .status(500)
      .render("login", { error: "Server error, try again later" });
  }
});

// Logout: destroy session
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error("Session destroy error:", err);
    res.clearCookie("connect.sid"); // clear cookie on client
    res.redirect("/auth/login");
  });
});

module.exports = router;
