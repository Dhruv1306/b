const express = require('express');
const multer = require('multer'); //to import multer
const app = express();

const upload = multer({dest : 'Upload/'}); // here we define a destination where our files from the clients will be handled
// If the folder 'Upload' is not present it will create one

app.listen(3000,()=>{
    console.log("Server Started");
});

app.get('/uploadFile',(req,res)=>{
    res.sendFile('./form.html',{root : '.'});
});

 /*app.post('/uploadFile',upload.single("fileUpload"),(req,res)=>{
    console.log(req.file); // here .file is a property like .body

    // This code is used if we want client to upload only one file 
    //here fileUpload is the name of the input from where client is uploading its file in the form
    res.send("File Recieved");
}) */

//To upload multiple files by the client we can do this
app.post('/uploadFile',upload.array("fileUpload",2),(req,res)=>{
    console.log(req.files) // On getting multiple files upload the .file property becomes .files

    //But to select multiple files in the form to upload we have add 'multiple' in the form.html input from where we uplaod the file
    res.send("File Recieved");
})

// If we want to upload different type of files like some txt and jpg then we use
/*app.post('/uploadFile',upload.fields([{name : 'gallery', maxCount : 1},
    {name : 'Text' , maxCount : 3}]),(req,res)=>{
        // Here with the fields we make a array object with conating name of files and maxCount
        //We can also do the upload.fields in a variable and then call it
    }); */