const fs = require('fs');
const path = require('path');

// Step 1:- Create the folder, Assiging it a path, & Checking if the folder Exists. 

const folderName = 'documents';  // Name of the folder to read
const folderPath = path.join(__dirname, folderName);   // Here, we have created an absolute path for this "document" folder. Means,  if our script(js file) is in like  "C:\projects"   then our   "documents" folder   will be in  "C:\Pprojects\documents".

//Check if the folder exists  

const exists = fs.existsSync('./documents');
console.log(exists)
if(!exists){
    fs.mkdir('./documents', {recursive:true}, (err) => {              // It will create the folder if it doesn't exist
        if(err) return new Error(err);
        else console.log("directory created")
    })
}

// EXTRA :-  Check whether a  specific file exists or not AND if doesn't exists it will copy that file from the root folder and paste it their.

const inputPath = 'C:/Users/DELL/OneDrive/Desktop/Clg/BEE/Assignment_2/original.pdf';
const outputPath = './documents/copied.pdf';
const checkFile = fs.existsSync('./documents/copied.pdf');
console.log(checkFile);
if(!checkFile){                                      // This is also working Asynchronously
    fs.readFile(inputPath, (err,data) => {
        if(err){console.log(err);}
        else{
            fs.writeFile(outputPath,data, (err) => {
                if(err){ console.log(err);}
                else { console.log('File Copied Successfully.');}
            });
        }
    });
}

//Step 2:- Read all the items(files & sub-folders) in the directory. ALSO, PRINTS ONLY FILE NAMES 

// fs.readdir(folderPath, (err,items) => {    // This is working Asynchronously
//     if(err){ console.log(err);}
//     else {                           // FILTER & PRINTS ONLY FILE NAMES
//         items.forEach(items => {    // Loop through each item in the directory.
//             const itemPath = path.join(folderPath, items);  // Get the absolute path of the item.
//             if(fs.statSync(itemPath).isFile()){   // fs.stateSync gets the info about the file;  isFile() checks if its a file.
//                 console.log(items);  // Prints the file name.
//             }
//         });
//     }
// });


/* At last, it will return 

true        ->          it indicates, 'documents' folder exists
true        ->          it indicates, file also existed
copied.pdf  ->          this is the name of the files present in the 'document' folder.


here, it's all are working in Async mode, therefore, if I want the whole code to give result in one line, I need to make any one of the fn. in synchronous mode. Let's make the last fn. in Synchronous mode. 
*/


// STEP 2:-  IN SYNCHRONOUS WAY

const items = fs.readdirSync(folderPath);  // Synchronously read directory contents

items.forEach(item => {
    const itemPath = path.join(folderPath, item);
    if (fs.statSync(itemPath).isFile()){
        console.log(item);
    }
});