const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
app.listen(3000, ()=> console.log("Server Started"));
app.use(express.static(path.join(__dirname, 'Multer')));

// const upload = multer({dest: 'Upload/'});        

// Custom storage configuration
const storage = multer.diskStorage({
    //destination: (req, file, cb) => cb(null, 'Upload/'),    // It will serach for the "Upload" directory. BUT, it doesn't create one dynamically, if it doesn't exist & throws an ERROR.    
    destination : (req,file,cb) => {
        const destPath = path.join(__dirname, 'Upload');
        if(!fs.existsSync(destPath)){ fs.mkdirSync(destPath, {recursive: true})}       // Check if directory exists, if not, create it. Also, recursive allows nested dirs
        cb(null, destPath);
    },    
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);   // Extracts the file extension from the original file.    // e.g. Example: 'photo.jpg' → '.jpg'
        const name = path.basename(file.originalname, ext);   // Extracts the base name of the file without its extension   // - Example: 'photo.jpg' → 'photo'.
        const time = Date.now();   // prevents file collisions
        cb(null,`${name}-${time}${ext}`);     // e.g. 'photo-1692441234567.jpg'
    }
});

//File filter to allow only jpg,png
const fileFilter = (req, file, cb) => {               // Multer’s fileFilter function must call a callback (cb) to either accept or reject the file.
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){ cb(null, true)}  // null -> No Error   &  tells multer to accept the file.  
    else{ cb(new Error('Only jpg and png files are allowed!'), false);}    // Rejects the file and passes an error to our route or error handler
};

// Multer setup with custom storage and filter
const upload = multer({ storage, fileFilter});        // This line creates a Multer instance with your custom config (storage, fileFilter, etc.)

app.get('/uploadFile', (req,res) => { res.sendFile('./form.html', {root: __dirname})});

app.post('/uploadFile', upload.single('fileUpload'), (req,res) => {
    if (!req.file){     // CHECK
    return res.status(400).send("You haven't uploaded any file.");
  }
    console.log(req.file);
    res.send('File Received');
});

// Multer error handling Middleware
app.use((err, req,res,next) => {
    if(err instanceof multer.MulterError || err.message.includes('Only jpg & png files are accepted')){
        return res.status(400).send(`<h2 style="color:red;">${err.message}</h2>`);
    }
})


/*
- req: The incoming request object (you can use this to access user info, route data, etc.)
- file: Metadata about the uploaded file (original name, MIME type, etc.)
- cb: A callback function to pass the final filename back to Multe
*/



/*
The "if" condition in the Multer Error handling Middleware, CHECKS whether the error that occurred is:
    1. A Multer-specific error
    2. Or a custom error you threw in your fileFilter function

    
    ✅ err instanceof multer.MulterError

- Checks if the error is an instance of Multer’s built-in error class
- Examples of Multer errors:
- File too large (LIMIT_FILE_SIZE)
- Too many files (LIMIT_UNEXPECTED_FILE)
- Invalid field name
- ✅ This catches errors thrown internally by Multer


    ✅ err.message.includes('Only jpg and png')

- Checks if the error message contains the string 'Only jpg and png'
- This matches the error you manually threw in your fileFilter:


🧩 Why Use Both Conditions?
Because Multer can throw errors in two ways:
- Internally (via its own logic)
- Externally (via your custom fileFilter)
This if statement ensures you catch both and respond with a clean message.


✅ What Happens If the Condition Is True?

return res.status(400).send(`<h3 style="color:red;">${err.message}</h3>`);

- Sends a 400 Bad Request response
- Displays the error message in red HTML
- ✅ Prevents the browser from showing a raw stack trace

*/