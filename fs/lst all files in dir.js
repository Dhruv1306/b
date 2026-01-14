const fs = require('fs');  // Import the 'fs' (File System) module to interact with the file system.
const path = require('path'); // It provide utilities for working with file & directory's paths in a way that is safe and cross-platform. USED FOR HANDLING & TRANSFORMING FILE PATHS.

// To reach the previous directory
const directoryPath = path.join(__dirname, '..');  

/* In this, 
// 'path.join' joins path segments into a single path string, handling slashes automatically.
// '__dirname' is a Node.js variable, that gives the directory name of the current module (the folder where this script is).
// '..' means "GO UP ONE DIRECTORY LEVEL" from the current directory.
*/

// Debug: Print the resolved Path
console.log("Reading from:", directoryPath)

// Read the contents of the directory asynchronously
fs.readdir(directoryPath, (err, data) => {
    if (err) {
        console.log("Error in getting the names of the files", err);
        return; // Exit early if there's an error
    }
    // Loop through and print each file/folder name
    data.forEach(data => {
        console.log(data);
    });
});