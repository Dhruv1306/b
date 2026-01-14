// Simple middleware verifying user session exists
module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.session && req.session.user) {
      return next(); // user is authenticated
    }
    // otherwise redirect to login
    return res.redirect("/auth/login");
  },
};
