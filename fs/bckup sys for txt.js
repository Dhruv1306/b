const fs = require('fs');
const path = require('path');

const exist = fs.existsSync('./backupNotes');             // Checking if the 'backupNotes' folder exist or not
console.log('Does the folder exist: ', exist);
if(!exist){                                                 // if doesn't exist, it will create it, automatically
    fs.mkdir('./backupNotes', {recursive: true}, (err) => {
        if(err) return new Error(err);
        else{ console.log('Folder Created Successfully.');}
    });
}

// Scanning the 'myNotes' Folder 
fs.readdir('./myNotes', (err, data) => {         // This is working Asynchronously
    if(err) return new Error(err);
    else {                               // finding all the '.txt' files
        data.forEach(data => {
            const itemPath = path.join('./myNotes', data);  // Necessary ONLY IF, I am checking whether it's a FILE or Not.
             if (fs.statSync(itemPath).isFile() && data.endsWith('.txt')) {     // Here i have used both CHECKS, 1st.  To check that it's a FILE & not a Directory.   2nd.  To Check, if the File name ends with '.txt'.
                console.log('Text files present in ./myNotes: ',data);

                //COPY THE FILES TO 'backupNotes' folder
                const destPath = path.join('./backupNotes', data);    
                fs.copyFile(itemPath, destPath, (err) => {
                    if(err) return new Error(err);
                    else console.log('File Copied Successfully: ', data);
                });
            }
        });
    }
});


/*  NOTE:- 
        1) If I write the LOC from 23 - 27, outside the "if" block, it will copy everything present in the 'myNotes' folder.

        2) Here,  I need to give the FULL PATH to the Destination file. CAUSE 'fs.copyFile' needs the full path including the file name, like ./backupNotes/filename.txt. If you use just './backupNotes', Node.js will try to copy the file to a directory path, not a file path, and this will result in an error.
*/