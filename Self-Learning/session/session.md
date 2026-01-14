# **Session**

    In Express.js, a session provides a way to maintain stateful interactions between a client and the server over multiple requests, despite HTTP being a stateless protocol. It allows you to store user-specific data on the server-side that persists across different page views or actions within a single user's interaction with the application.

In other words,  A **session** is a way to  **store data about a user across multiple requests.**

Since HTTP is stateless (it doesn’t remember anything between requests), sessions help maintain user-specific data like login status, shopping cart contents, or preferences.

#### **INSTALLATION :-   We need a middleware, generally, `express-session`**

* **Install**:-  `npm i express-session`
* To install both in one go, we can :-
  * *`npm i express express-session`*
* Or, we can even add more :-
  * `npm i express express-session mongoose dotenv`

#### **🛠️ How Sessions Work in Express.js**

Here’s the basic flow:

1. **User logs in or interacts with your app.**
2. **Server creates a session object** and stores it (usually in memory or a database).
3. A **session ID** is created & sent to the client via a cookie.
4. **In future**, whenever the client sends requests to the server , the **session ID** also comes with it.
5. The server uses that ID to retrieve the the session data & proceed accordingly.

#### **🧠 Conceptual Tip for You**

Think of sessions as a **temporary memory bank** tied to a user. It’s like giving each user a locker with a key (the session ID). The server keeps the locker contents, and the user just carries the key.

#### **Notes:-**

###### 1. **Session Store** :-

    a) In-memory  ->  During`Testing` / `development Phase`

    b) DataBase  ->  During`Production`

###### 
    2.

---

##### ***Js File :-* **

const express = require('express');

const session = require('express-session');

* [ ] const app = express();

app.listen(3000, () => { console.log("Server Started")});

app.use(session({

secret : 'your-secret-key',      // 🔑 used to sign the session ID cookie

resave : false,                      // don't save session if unmodified    // Also, helps in minimizing the load on server.       // Also, for Security.

saveUninitialized : true,      // save / generate new sessions      // Default :- true

cookie: { secure : false }     // fasle :- http     // true :- https

}));

// `saveUninitialized` :- When a user comes again in future but doesn't store any data & doesn't update anything. Then, it's value will be FALSE, which means no session will be generated.

// 🔸 `secure: false` is fine for local development. For production, use `true` with HTTPS.

app.get('/', (req,res) => {

res.send(`You Visited 10 times`);

});


---

###### **🧠 How It Works in Practice**

Once set up:

* You can store data like `req.session.user = { name: 'Dhruv' }`
* Access it later with `req.session.user`
* It persists across requests until the session expires or is destroyed


---

---



## Session Expiration :- 

    `Session expiration is a key part of managing user state securely and efficiently.`


###### ⏳ What Is Session Expiration?

Session expiration means:

* The session data is automatically deleted after a certain time.
* The user is logged out / treated as a new visitor after that time.
* It helps prevent stale sessions and improves security.


**🧩 We control expiration using the `cookie.maxAge` option  ( `maxAge` is in milliseconds )**

   // cookie: {
    maxAge: 1000 * 60 * 15                        // 15 minutes
  }

// After 15 minutes of inactivity, the session cookie expires.


### 🧠 Important Notes:

* This sets the **client-side cookie** expiration.
* The session data on the server may still persist unless you're using a store like Redis or MongoDB with TTL (Time-To-Live).
* If you want to destroy the session manually (e.g., on logout), use:
  * req.session.destry();



### 🛠️ Optional: Use `rolling` to Reset Expiry on Activity

**`rolling: true`** means the session cookie's expiration time resets **on every click or request** .

So if a user is active, their session stays alive. If they stop interacting, the session expires after `maxAge`.


// rolling: true,
  cookie: {
    maxAge: 1000 * 60 * 15                                 // resets on each request
  }


---

---




## Session Storage

    Session storage refers to**where and how session data is stored on the server** . When a user interacts with your app, Express creates a session object (`req.session`) to track their state. That data needs to live somewhere between requests.



##### 🧩 Two Parts of a Session

1. **Client-side (Cookie):**
   * Stores the session ID (not the actual data)
   * Sent with every request
   * Controlled via `cookie` settings in `express-session`
2. **Server-side (Session Store):**

* Stores the actual session data (e.g., `views`, `userId`)
* Indexed by session ID
* Can be in memory, a database, or a cache


##### 🗂️ Types of Session Stores

| Store Type                                       | Description                    | Pros                 | Cons                             |
| ------------------------------------------------ | ------------------------------ | -------------------- | -------------------------------- |
| **MemoryStore**(default)                   | Stores sessions in RAM         | Easy for dev         | Not scalable, no cleanup         |
| **FileStore**                              | Stores sessions in files       | Simple               | Slow, not for production         |
| **Database (MongoDB, PostgreSQL / MySQL)** | Stores sessions in DB          | Persistent, scalable | Slightly slower than in-memory   |
| **Cache (Redis, Memcached)**               | Stores sessions in fast memory | Super fast, scalable | Requires setup, external service |
