const fs = require('fs');
const path = require('path');

// Here we are Exporting the RAW HTML ( With it, we use `res.send`)   (We don't need to use the {root : __dirname})
// module.exports = {
//   adminDashboardHTML: fs.readFileSync(path.join(__dirname, 'adminDashboard.html'), 'utf-8'),
//   userDashboardHTML: fs.readFileSync(path.join(__dirname, 'userDashboard.html'), 'utf-8'),
//   loginHTML: fs.readFileSync(path.join(__dirname, 'login.html'), 'utf-8'),
//   registrationHTML: fs.readFileSync(path.join(__dirname, 'registration.html'), 'utf-8'),
//   Users: require('./users.json')
// };

// Here, we are Exporting the FILE PATH ( With it, we use `res.sendFile`)   (We don't need to use the {root : __dirname})
// module.exports = {
//   adminDashboardPath: path.join(__dirname, 'adminDashboard.html'),
//  userDashboardPath: path.join(__dirname, 'userDashboard.html'),
//   loginPath: path.join(__dirname, 'login.html'), 
//   registrationPath: path.join(__dirname, 'registration.html'),
//   Users: require('./users.json')
// };

module.exports = {
  // Raw HTML strings (for res.send)
  loginHTML: fs.readFileSync(path.join(__dirname, 'login.html'), 'utf-8'),
  adminDashboardHTML: fs.readFileSync(path.join(__dirname, 'adminDashboard.html'), 'utf-8'),
  userDashboardHTML: fs.readFileSync(path.join(__dirname, 'userDashboard.html'), 'utf-8'),
  registrationHTML: fs.readFileSync(path.join(__dirname, 'registration.html'), 'utf-8'),

  // Absolute file paths (for res.sendFile)
  loginPath: path.join(__dirname, 'login.html'),
  adminDashboardPath: path.join(__dirname, 'adminDashboard.html'),
  userDashboardPath: path.join(__dirname, 'userDashboard.html'),
  registrationPath: path.join(__dirname, 'registration.html'),

  // JSON data
  Users: require('./users.json')
};


/*
✅ Why index.js Is a Game-Changer
You don’t have to create it, but here’s why it’s highly recommended:

🔄 1. Centralized Re-Exports = Cleaner Imports
Instead of doing this in every file:
const loginPage = require('./utils/login.html');
const dashboard = require('./utils/dashboard.html');


You can do this:
const { loginPage, dashboard } = require('./utils');


That’s possible because index.js acts like the “face” of the folder. Node.js automatically looks for index.js when you require('./utils').


📦 2. Encapsulation & Abstraction
It lets you hide internal structure. Even if your folder has subfolders like html/, json/, scripts/, you can expose only what’s needed:
// utils/index.js
module.exports = {
  loginPage: require('./html/login.html'),
  userData: require('./json/users.json')
};


Now your consumers don’t need to know the internal layout — just the interface.


🧹 3. Refactor-Friendly
If you move or rename files inside utils, you only update index.js. All other imports stay untouched. That’s a huge win for maintainability.

🧠 4. Supports Tree-Shaking (in ES Modules)
If you ever switch to ES Modules (import/export), bundlers like Webpack or Vite can optimize unused exports from index.js, reducing bundle size.



Now you can do:
const utils = require('./utils');    OR          Check the below NOTE
const { loginHTML, users } = require('./utils');

NOTE :-

"const utils = require('./utils');"

This gives you access to everything exported from index.js as properties of the utils object:

const loginHTML = utils.loginHTML;
const users = utils.users;
const dashboardHTML = utils.dashboardHTML;
// etc.


🛠️ How It Works
- Node.js automatically looks for index.js when you require('./folderName').
- So require('./utils') is shorthand for require('./utils/index.js').
- You can then access all exports like utils.someFunction, utils.someData, etc.


**************************************************

You're only importing the loginHTML and users properties from whatever ./utils/index.js exports. Even if index.js exports 10 other things, you're not loading or referencing them in your current file.

⚙️ But under the hood…
Node.js does load the entire module (i.e., everything inside index.js) once per runtime. That’s how CommonJS works — it caches the module after the first require() call. But your destructuring only pulls out the specific keys you ask for.
So:
- ✅ You get only what you ask for in your code.
- 🧠 Node loads the whole module once, but doesn’t re-load it every time.
- 🚀 Performance impact is negligible unless your module has heavy computation on load (e.g., reading large files synchronously)


****************************

How  to  check  what's  imported ?

console.log(utils);    //     It will give you a check of what's inside your utils object after importing it.
// OR
console.log(Object.keys(utils)); // Just the names of exported properties
// OR
console.table(utils);    // If the exports are mostly functions or strings:
*/