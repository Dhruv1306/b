// single upload
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
app.listen(3000, () => { console.log("Server Started")});

app.use(express.static(path.join(__dirname, 'Multer')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    !fs.existsSync(uploadsDir) && fs.mkdirSync(uploadsDir, { recursive: true });
    cb(null, uploadsDir);
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){ cb(null, true);}
    else{ cb(new Error('Only jpg & png files are allowed to submit!!'), false);}
}

const upload = multer({
    storage,
    fileFilter
});

app.get('/uploadFile', (req,res) => { res.sendFile('./form.html', {root: __dirname})});

app.post('/uploadFile', upload.single('fileUpload') ,(req,res) => {
    if(!req.file) return res.send("You haven't uploaded any file.");
    res.send(`File  at path  Received Successfully`);
    console.log(req.file);
});

app.use((err,req,res,next) => {
     if(err instanceof multer.MulterError || err.message){
        return res.send(`<h2 style="color:red;">${err.message}</h2>`);
     }
});