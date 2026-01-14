const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/authMiddleware");

// Admin dashboard (protected)
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  // show the admin dashboard, pass session user data to view
  res.render("admin-dashboard", { user: req.session.user });
});

module.exports = router;
