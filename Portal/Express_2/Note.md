* **"id: Date.now()**"
  * This line sets the `id` of a new post or comment to the **current timestamp in milliseconds** since January 1, 1970 (the Unix epoch).This number is:

    * **Unique** (unless two requests happen in the exact same millisecond)
    * **Sequential** (newer items have higher IDs)
    * **Numeric** , which works well for sorting or comparisons

✅ **Why Use It?**

* **Quick and easy** way to generate a unique ID without needing a database.
* Works well for dummy data or small-scale apps.
* Avoids collisions in most cases.

⚠️ **Limitations**

* Not guaranteed to be unique in high-concurrency environments.
* Not human-readable.
* Can get very large over time.

---

🧪 **Alternatives**

If you want more control or readability:

* Use a UUID generator (`uuid` package)
* Use incremental IDs (e.g. `id = lastId + 1`)
* Let a database like MongoDB auto-generate `_id`

---

🧠 **Strategy: Auto-Incrementing IDs**

We’ll:

1. Track the **last used ID** in a variable
2. Increment it each time a new item is added
3. Assign the new ID to the incoming post or comment

---

![1754835901451](image/Note/1754835901451.png)

---

* **"const deleted = posts.splice(index, 1);"**

  `posts.splice(index, 1)` 🛠

  * `splice()` changes the **original array** (not a copy).
  * **First argument** → `index` → the starting position to remove elements.
  * **Second argument** → `1` → how many elements to remove from that position.
  * Example:

    let arr = ["a", "b", "c", "d"];
    arr.splice(1, 1); // removes "b"
    console.log(arr); // ["a", "c", "d"]
  * 

  **`const deleted = ...`** 📦

  * `splice()` **returns** an array containing the removed elements.
  * `deleted` will hold the removed post(s).
  * Example:

    let posts = ["Post1", "Post2", "Post3"];
    const deleted = posts.splice(1, 1);
    console.log(deleted); // ["Post2"] (removed post)
    console.log(posts);   // ["Post1", "Post3"] (original array updated)

**⚠  Edge cases to watch for :**

* If `index` is  **`-1`** , meaning the post wasn’t found, `splice(-1, 1)` will remove the **last element** by accident.
* If `index` ≥ `posts.length`, nothing will be removed, and `deleted` will be `[]`.
* If `1` is replaced with a bigger number, more posts get deleted."

---

### Middlewares:

* ALL  TYPES  OF  MIDDLEWARES  ARE  GLOBAL  SCOPED
* BUT  THEIR  IS  A  DIFFERENCE  BETWEEN  MIDDLEWARE  SCOPE  &  VARIABLE  SCOPE
  * If  you  declare a Variable  inside  a middleware  ->  Then  THAT  Variable  isn't  a GLOBAL  Variable.  Means  it  isn't  GLOBALLY  AVAILABLE.
    * And  you  will  get  an  error  `ReferenceError: VISA is not defined`    // VISA  is  a  variable  here.
  * So if you are using that variable in a route you can't do that with either of these two methods:
    * a) You can't use that single variable,  You need to use that whole line.  If  it's  like  `res.locals.VISA`,  THEN  You  need  to  use  this only.  You  can't  just  use  VISA.
    * b) By creating a constant variable in that route and then use that variable that you have created just now, in the whole block of code.
  * ***Also note that sometimes if that variable's value is coming undefined then it means that the value that is coming in that variable is from that route which doesn't need this middleware but cause of its nature its accessible in every route therefore you are getting undefined. So in that case, scope the middleware to only relevant routes by introducing a route in the middleware.***
  * For more details, check `updatedApp2.js`  file.

### Custom Middleware :-

`app.use()` :- It **applies** that specific middleware to  **all routes** , regardless of whether what this middleware do  **"is Present"** or **"is Asked"** in that Route. But whatever it is, the codedoesn't throw any errors.
