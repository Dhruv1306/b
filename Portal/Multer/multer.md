## MULTER

    Multer is a middleware for handling`multipart/form-data`, which is primarily used for **UPLOADING FILES** in **Node.js** applications using  **Express.js** .

##### 🔧 Key Features:

* Parses incoming file uploads from forms.
* **Storage: Memory Storage & Disk Storage.**
* *Supports **F****ile filtering,  Size limits, Validation of uploaded files and Custom storage engines.***
* Integrates easily with Express route handlers
* Adds metadata like `req.file` or `req.files` to your route handler

---

### 🧩 Why `express.urlencoded()` Isn’t Enough

    `app.use(express.urlencoded({ extended: true }));`

    This middleware is used to parse**URL-encoded form data** , which is the default format for HTML forms which ***don’t include file uploads.***

##### ✅ What It Handles:

* Simple form fields like text, numbers, checkboxes
* Data sent with `Content-Type: application/x-www-form-urlencoded`

##### ❌ What It **Doesn't** Handle:

* **File uploads**
* Forms with `enctype="multipart/form-data"`

---

### Additionally with Multer you can do:-

* **User uploads** : Profile pictures, documents, media files
* **Admin dashboards** : Uploading CSVs, product images, etc.
* **APIs** : Accepting file data from frontend clients or third-party integrations

---

##### Js file:-

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/submit', upload.single('avatar'), (req, res) => {
  console.log(req.body); // text fields
  console.log(req.file); // uploaded file metadata
  res.send('Form submitted!');
});

// For more info:-  Go To  -> ->  "Multer\Multer 1\multer.js"

---

### 🧠 1. **Disk Storage**

##### 🔧 What It Does:

* Saves the uploaded file **directly to your filesystem** (e.g., `Upload/` folder)
* You define the destination and filename using `multer.diskStorage()`

##### ✅ Use When:

* You want to **persist files** (e.g., images, PDFs, resumes)         // 🔒 **Storing files in a local directory on the server (e.g., `/uploads`, `/public/files`) so they survive server restarts &  they remain available across sessions or user interactions.**
* You need to **serve or move files** later (e.g., send to cloud, attach to email)
* You want readable filenames and organized folders
* Or if in future, you want to retieve that file or it's information from database (e.g., MongoDB, PostgreSQL).

**//  NOTE:-  Persisting files is part of state management in backend systems.**

##### 📦 Example:

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'Upload/'),
  filename: (req, file, cb) => cb(null, file.originalname)
});

##### 🧩 Result:

* File is saved to disk
* Accessible via `req.file.path`

### 📦 Common Use Cases

| Use Case              | What You Persist    | Why It Matters                        |
| --------------------- | ------------------- | ------------------------------------- |
| User uploads a resume | PDF file + metadata | So it can be reviewed later           |
| Profile picture       | Image file          | To display across sessions            |
| Invoice download      | PDF file            | For record-keeping and access history |

---

### ⚡ 2. **Memory Storage**

##### 🔧 What It Does:

* Stores the uploaded file **in RAM as a buffer**
* Nothing is written to disk

##### ✅ Use When:

* You want to **process the file immediately** (e.g., resize image, scan content)
* You don’t need to save the file permanently
* You plan to **stream or upload to cloud** (e.g., AWS S3, Firebase) without touching disk

##### 📦 Example:

const storage = multer.memoryStorage();

##### 🧩 Result:

* File is stored in `req.file.buffer` (a `Buffer` object)
* You can manipulate it directly in memory

### 🧠 Common Use Cases of Memory Storage

| Use Case                              | What’s Stored in Memory                 | Why It’s Useful                                   | Risks / Limitations                          |
| ------------------------------------- | ---------------------------------------- | -------------------------------------------------- | -------------------------------------------- |
| **Session Management**          | User ID, auth token, preferences         | Enables quick access to user state across requests | Lost on server restart unless persisted      |
| **Caching API Responses**       | Fetched data from external APIs          | Reduces latency and external calls                 | Can become stale or inconsistent             |
| **Rate Limiting**               | IP request count, timestamps             | Prevents abuse by tracking request frequency       | Not scalable across multiple instances       |
| **Temporary File Buffers**      | File chunks during upload/download       | Speeds up file handling before persistence         | Memory-intensive for large files             |
| **In-Memory Queues**            | Tasks waiting to be processed            | Useful for lightweight job scheduling              | No durability if server crashes              |
| **Flash Messages**              | One-time messages (e.g., success alerts) | Communicates feedback between redirects            | Short-lived, not suitable for long-term data |
| **Real-Time Data (e.g., chat)** | Active users, messages, typing status    | Enables instant updates in sockets or live apps    | Needs syncing if scaled horizontally         |
| **Temporary Tokens**            | OTPs, password reset tokens              | Fast validation without DB lookup                  | Must expire quickly to avoid security issues |
| **In-Memory DB for Testing**    | Mock data, test records                  | Speeds up unit tests and dev workflows             | Not suitable for production                  |

---

### 🆚 Comparison Table

| Feature     | Disk Storage                  | Memory Storage                     |
| ----------- | ----------------------------- | ---------------------------------- |
| Location    | Filesystem (e.g.,`/Upload`) | RAM (temporary)                    |
| Access      | `req.file.path`             | `req.file.buffer`                |
| Persistence | Yes                           | No                                 |
| Performance | Slower (I/O involved)         | Faster (no disk I/O)               |
| Use Case    | Save files, serve files       | Process files, stream to cloud     |
| Risk        | Disk space usage              | RAM usage (watch for large files!) |

##### 🧪 Bonus Tip

You can even combine both:

* Use memory storage for quick processing
* Then save to disk or upload to cloud manually

---

Continue..... "Custom file name & file type filtering with multer"........"Microsoft Copilot"......"continue".

.

.

.

.
