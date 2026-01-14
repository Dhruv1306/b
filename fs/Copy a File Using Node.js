const fs = require('fs');

const inputPath = 'C:/Users/DELL/OneDrive/Desktop/Clg/BEE/Assignment_2/original.pdf'; // pdf file to be copied
const outputPath = './backups/report.pdf'; //path and name of the file where to be copied and what is the name

fs.mkdirSync('./backups', { recursive: true });   //synchronous 

// const exist = fs.existsSync('./backups'); //Checks if the backup directory exist or not. if exists then it will returns true.

// if(!exist){ 
//     fs.mkdir('./backups',true,(err)=>{      // asynchronous
//         if(err) console.log(err);
//     });
// } // The 1st parameter will search the folder, if doesn't exist then it will create it. The 2nd parameter is a recurssive parameter it will give a boolean result. The 3rd is callback.

fs.readFile(inputPath, (err, data) => {     // reads the pdf file from inputPath
    if(err) { console.log(err);}
    else { 
        fs.writeFile(outputPath, data, (err) => {    // The function below will write File module inside readFile so as to use the read data for copying.
            if(err) { console.log(err);}
            else { console.log('File coppied sucessfully.');}
        });
    }
});

// const fs = require('fs');
// const inputPath
// const outputPath

// fs.readFile(inputPath, (err, data) => {
//     if(err) { console.log(err);}
//     else { 
//         fs.writeFile(outputPath, data, (err) => {
//             if(err) console.log(err);
//             else { console.log('File copied successfully.');}
//         });
//     }
// });