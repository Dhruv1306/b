const express = require('express');
const app = express();
const session = require('express-session');
app.listen(3000, () => { console.log("Server Started")});

app.use(session({
    secret: "hello",
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 1   // 1 minute
    }
}));

app.get('/', (req,res) => { 
    console.log(req.session);
    console.log("Session ID:", req.sessionID);
    // console.log(req.session.views);  // undefined
    req.session.views = (req.session.views || 0) + 1;   // This line keeps track of how many times a user has visited a route during their session. 
    res.send(`You visited ${req.session.views} times ( including this one )`)
    // res.send("You visited 10 times");
});

/* 
🔍 What It Does:

-> req.session.views
This accesses the views property stored in the user's session. If it already exists, it holds the number of times they've visited.

-> req.session.views || 0
This checks:
            - If req.session.views exists → use its value
            - If it doesn't → default to 0

This is a common JavaScript pattern for setting default values.

-> + 1
Adds 1 to the current count (or to 0 if it's the first visit).

-> req.session.views = ...
Updates the session with the new count.

*/



/*
🧪 Example Flow:

Let’s say a user visits the page for the first time:

- req.session.views is undefined
- (undefined || 0) becomes 0
- 0 + 1 becomes 1
- So now: req.session.views = 1
Next visit:
- req.session.views is 1
- (1 || 0) becomes 1
- 1 + 1 becomes 2
- So now: req.session.views = 2

*/