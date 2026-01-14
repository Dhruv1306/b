/*In this programm we will be using diskStorage for uploading our file.
 We use this because this Disk Storage helps us in providing full control of uploaded file like 
 changing names and changing file destinations etc.*/

 const express = require('express');
 const multer = require('multer');

 const app = express();
 const storage = multer.diskStorage({
    filename : function (req,file,cb){ // this is to definw the file name
        //cb is the callback function
        cb(null,"filename.jpg"); // here null is for error check and other is the file name we want to give
    },

    //One thing to remember here we have to create a folder manually where to store our files
    destination : function(req,file,cb){ // this is for the destination where to upload the file
        if(file.mimetype == "image/jpeg"){
            cb(null,"Upload Files/Images"); // if the uploaded file is an image we make another folder inside Uploaf Files where Images is stored
        }
        else{
            cb(null,"Upload Files/");
        }
    }
 });

 const upload = multer({storage : storage}); //here first storage is the peoperty

 app.listen(3000,()=>{
    console.log("Server started");
 });

app.get('/uploadFile',(req,res)=>{
    res.sendFile('./index.html',{root : '.'});
});

app.post('/uploadFile',upload.single("fileUpload"),(req,res)=>{
    console.log(req.file);
    res.send("File recieved");
})