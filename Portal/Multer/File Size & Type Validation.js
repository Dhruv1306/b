const express = require('express');

const multer = require('multer');

const path = require('path');

const fs = require('fs');



const app = express();

const PORT = 3000;



app.get('/uploadImage', (req, res) => {

  res.sendFile("form.html",{root : "."});

});



const upload = multer({

  storage: multer.diskStorage({

    destination: function (req, file, cb) {

      cb(null, 'uploads/products');

    },

    filename: function (req, file, cb) {

      cb(null,file.originalname);

    }

  }),

  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB

  fileFilter: function (req, file, cb) {

    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!allowedTypes.includes(file.mimetype)) {

      return cb(new Error('Only .jpg and .png files are allowed'));

    }

    cb(null, true);

  }

});



app.post('/uploadImage', upload.single('productImage'), (req, res) => {

  if (!req.file) {

    return res.status(400).send({ error: 'No file uploaded or invalid file type.' });

  }



  res.send({

    message: 'File uploaded successfully',

    filePath: req.file.path,

    size: `${(req.file.size / 1024).toFixed(2)} KB`

  });

});



app.listen(PORT, () => {

  console.log(`Server running at http://localhost:${PORT}`);

});