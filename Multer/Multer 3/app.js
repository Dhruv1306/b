const express = require('express');
const fs = require("fs");
const multer = require("multer");

const app = express();

app.listen(3000,()=>{
    console.log("Server Started At http://localhost:3000/upload");
});

const storage = multer.diskStorage({
    filename : function (req,file,cb){
        cb(null,file.originalname); 
    },

    destination : function(req,file,cb){
        if(file.mimetype == "application/pdf"){
            cb(null,"upload/resume");
        }
        else{
            cb("Error : Wrong File type");
        }
    }
});

const upload = multer({
    storage : storage
});

app.use(express.urlencoded({extended : true}));

app.get("/upload",(req,res)=>{
    res.sendFile("form.html",{root : '.'});
});

app.post("/upload",upload.single("fileUpload"),(req,res)=>{
    const bodyData = req.body;

    const user = {
           name: req.body.name,
           email: req.body.email,
           phone: req.body.phone,
           filePath: req.file.path
        };

    fs.appendFileSync("./upload/user.json",JSON.stringify(user) + "\n");

    res.send(`
        Name : ${user.name}<br>
        Email : ${user.email}<br>
        Phone : ${user.phone}<br>
        File Uploaded : ${req.file.originalname}
        `);
})