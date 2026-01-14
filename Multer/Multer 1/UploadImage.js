 const express = require('express');
 const multer = require('multer');
 const app = express();
 const storage = multer.diskStorage({
    filename : function (req,file,cb){
        cb(null,file.originalname); 
    },

    destination : function(req,file,cb){
        if(file.mimetype == "image/jpg" || file.mimetype == "image/png"){
            cb(null,"Upload Files");
        }
        else{
            cb("Error : Wrong File type");
        }
    }
 });

 const upload = multer({storage : storage});

 app.listen(3000,()=>{
    console.log("Server started");
 });

app.get('/uploadFile',(req,res)=>{
    res.sendFile('./index.html',{root : '.'});
});

app.post('/uploadFile', (req, res) => {
    upload.single("fileUpload")(req, res, function (err) {
        if (err) {
            return res.status(400).send("Error: Invalid file type. Only .jpg and .png are allowed.");
        }

        if (!req.file) {
            return res.status(400).send("Error: No file uploaded.");
        }

        res.send("File received");
    });
});