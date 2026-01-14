# Admin Auth Implementation - Brief & Detailed Steps

## Brief summary

- Added Mongoose User model for admin credentials.
- Created a seed script to insert a hashed admin user (bcryptjs).
- Implemented login (POST /auth/login) and logout endpoints.
- Used express-session with connect-mongo to persist sessions in MongoDB.
- Created EJS views: login.ejs and admin-dashboard.ejs.
- Added middleware to protect admin routes and wired routes in app.js.

## Detailed steps & rationale

1. Create User model (models/User.js)

   - Purpose: central store for admin credentials.
   - Notes: stores hashed password, includes comparePassword method for login checks.
2. Seed script (seed/adminSeed.js)

   - Purpose: provide an initial admin user quickly during development.
   - Notes: uses bcryptjs to hash password before saving (meets acceptance criteria).
   - Run: `node seed/adminSeed.js` after installing dependencies and ensuring MONGO_URI is correct.
3. Auth routes (routes/auth.js)

   - Purpose: provide GET /auth/login, POST /auth/login and GET /auth/logout.
   - Login flow:
     - Find user by email.
     - Compare password with stored bcrypt hash.
     - On success, create a session: `req.session.user = { id, email, role }`.
     - On failure, render login.ejs with an error message (no alert).
4. Session management (app.js)

   - Purpose: persist logged-in state across requests.
   - Implementation: express-session with connect-mongo (stores sessions in MongoDB).
   - Rationale: sessions are straightforward for server-rendered pages and align with project notes.
5. Middleware (middleware/authMiddleware.js)

   - Purpose: protect routes such as /admin/dashboard by checking session existence.
   - Behavior: redirects unauthenticated users to /auth/login.
6. Admin routes & view (routes/admin.js, views/admin-dashboard.ejs)

   - Purpose: display admin UI after login.
   - Rationale: ensures acceptance criteria "Admin dashboard is displayed after successful login".
7. Views (views/login.ejs)

   - Purpose: show form and inline error messages when login fails.
   - Rationale: meets acceptance criteria to show appropriate error messages (no alerts).

## Run instructions

1. Install dependencies:
   npm install express-session connect-mongo bcryptjs mongoose ejs body-parser
2. Ensure MongoDB is running and optionally set MONGO_URI environment variable:
   set MONGO_URI=mongodb://127.0.0.1:27017/uni_assignment
   set SESSION_SECRET=your_long_secret_here
3. Seed admin:
   node seed/adminSeed.js
4. Start app (depending on your project start script):
   node app.js
   or
   npm start
5. Open browser: http://localhost:3000 (or your configured port), login at /auth/login with seeded credentials (admin@example.com / Admin@123)

## Notes & next steps

- Change seeded password and SESSION_SECRET before production.
- Add CSRF protection and rate-limiting for production.
- Consider password reset flow and user management UI.
