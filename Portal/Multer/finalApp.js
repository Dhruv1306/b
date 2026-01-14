const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');
const fs = require('fs');
app.listen(3000, ()=> { console.log("Server Started")});

app.use(express.static(path.join(__dirname, 'Multer')));

const storage = multer.diskStorage({     // Custom Storage
    destination : (req,file,cb) => {
        const destPath = path.join(__dirname, 'Upload');
        if(!fs.existsSync(destPath)){ fs.mkdirSync(destPath, {recursive: true})}       // CHECK if directory exists, if not, create it. Also, recursive allows nested dirs
        cb(null, destPath);
    },
    filename: (req,file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname,ext);
        const time = Date.now();
        cb(null, `${name}-${time}${ext}`);
    }
});

const fileFilter = (req,file,cb) => {         // File Filteration
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){ cb(null, true);}
    else{ cb(new Error('Only jpg & png files are allowed to submit!!'), false);}
};

const upload = multer({
    storage, 
    fileFilter, 
    limits: { fileSizes: 5 * 1024 * 1024 }  //  5 MB        // Size Limit
});

app.get('/uploadFile', (req,res) => { res.sendFile('./form.html', {root: __dirname})});
app.post('/uploadFile', upload.single('fileUpload'),(req,res) => {
    if(!req.file) return res.send("You haven't uploaded any file.");     // CHECK
    res.send('File Received');
    console.log(req.file);
});

app.use((err,req,res,next) => {
    if(err instanceof multer.MulterError || err.message){
        return res.send(`<h2 style="color:red;">${err.message}</h2>`);
    }
    next();
});