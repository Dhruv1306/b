// File System module

const fs = require('fs');

// writeFile  :- file ko create bhi karega and write bhi karega 

//fs.writeFile('./Text.txt', 'Hello Class');     // kis file me write karna hai & 2nd is data jo write karna hai. ab ye ASYNC task hai. yeh BACKGROUND me chalega but hume pata nahi chalega ki yeh task perfornm ho chuka hai yeh nahi. So for that we need to make 


// Async fn. :-  Works in the Background.   -> ->   humare pass aaya -> RAM me gaya -> Stack me gaya  -> event loop me gaya ->  worker thread me gaya  ->  after this, worker thread will call callback fn. (This call back fn. is the same we put in our code.) -> it tells the task executed SUccessfully. But if  suppose worker thread slept while working, then execution will not happen successfully, then it will return an ERROR.


// fs.writeFile('./Text.txt', 'Hello Class', callback);  

// function callback(error){
//     if(error){ 
//         console.log(error)
//         return;
//     }
//     console.log('File written successfully.');
// }
                                                                // utf-8  -> utf-16  -> ASCII


// ------------------------------------------------------------------------------------------------------------



// Synchronous:-  

//fs.writeFileSync('./Text.txt', 'Hello Sync Write File');       // Synchronous Way

// TO HANDLE ERROR IN SYNC fn. WE ALWAYS USE try & catch 

// try{
//     fs.writeFileSync('./Text.txt', 'Hello Sync Write File');
// }
// catch(err){ 
//     console.log(err);
// }



// ***********************************************************************************************************



// readFile:-

// fs.readFile('./Text.txt', 'utf-8', callback);     // path, encoding type, callback (cause async)

// var fileData;
// function callback(err, data){
//     if(err){ 
//         console.log(err);
//     }
//     // console.log(data);
//     fileData = data;
// }




// mkdir
//readdir   -> we are getting files .  so we store similar type of data in ARRAYS 
//             Therefore, readdir -> return an array of files

// we need to check whether the PATH exist or not. -> ->  "exist" is depricated now so we use "access" 

// access:-  provide the accessibility of the file (like can we write, or read, or can we do both)
//           2nd thing it provide 

// file delete -> fs.unlink

// directory delete -> rmdir













// *********************************************************************************************************









// fs.readFile('../demo.txt', "utf-8", (err, data) => {
//     if(err){ console.log(err)}
//     else{ 
//          console.log("File copied successfully")
//     }
// })

// fs.writeFile('./copy.txt', "Hello Guys", (err, data) => {
//      (err) ? console.log(err) : console.log("File Written successfully")
// })

// fs.unlink('./copy.txt', (err) => {
//     (err) ? console.log(err) : console.log("File deleted Successfully")
// })

// fs.mkdir('../Demo', (err) => {
//     (err) ? console.log(err) : console.log("Directory created successfully")
// })

// fs.writeFile('../Demo/copy.txt', "1", (err) => {
//     (err) ? console.log(err) : console.log("File Created Successfully")
// })

// fs.readdir('../Demo', (err, data) => {
//     if(err) { console.log(err)}
//     else{ 
//         // fs.writeFile('../Demo/copy2', data, (err) => {                   // It will give Error, Cause "readdir" return an ARRAY, while "writeFile" is waiting for a "STRING" type argument.
//         //     (err) ? console.log(err) : console.log("Success")            // Therefore we need to handle that first. 
//         // })

//         const content = data.join('\n');  // It will join file names witha new line
//         fs.writeFile('../Demo/copy2.txt', content, (err) => {
//             (err) ? console.log(err) : console.log("Success");
//         })
//     }
// })

// fs.rm('../Demo', {recursive: true, force: true}, (err) => {                  // Now, it will delete a non-empty directory too
//     (err) ? console.log(err) : console.log("Directory Removed Successfully")
// })

