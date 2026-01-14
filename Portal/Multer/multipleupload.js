const express = require('express');

const multer = require('multer');

const app = express();

app.listen(3000,()=>{
    console.log("Server Stared");
});

const storage = multer.diskStorage({
    filename : function(req,file,cb){
        cb(null,file.originalname);
    },
    destination : function(req,file,cb){
            cb(null,"uploads/gallery");
        }
    });

function fileFilter(req,file,cb){
    if(
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ){
        cb(null,true);
    }
    else{
        cb(new Error("Only .jpg, .jpeg, .png files are allowed"));
    }
}

const upload = multer({
    storage : storage,
    fileFilter : fileFilter,
    limits : {files : 5}
});

app.get("/multifile",(req,res)=>{
    res.sendFile("form.html",{root : "."});
});

app.post("/multifile", (req, res) => {
    upload.array("imgUpload", 5)(req, res, function (err) {
        if (err) {
            return res.status(400).send(err.message || "Upload error");
        }
        const filenames = req.files.map(file => file.filename);
        res.json({ uploadedFiles: filenames });
    });
});