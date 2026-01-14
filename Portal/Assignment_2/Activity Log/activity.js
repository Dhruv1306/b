// const fs = require('fs');

// function getCurrentTime() {
//   const now = new Date().toISOString(); // function to get the current time
//   return now;
// }  //"new Date" is a standard JavaScript constructor for working with dates and times. 

// function append(){
//     setInterval(()=>{
//         const log = `log Entry At ${getCurrentTime()}\n`;  //append function with setinterval to log time after every interval
//         fs.appendFile('activity.log',log,(err)=>{
//             if(err) console.log(err);
//             else console.log("Log appended: ",log.trim());
//         });
//     },10000);
// }                   // In Node.js, fs.appendFile is asynchronous and expects a callback as the last argument, to handle errors. Without it, you won't know if the write succeeded or failed, and Node.js may warn about unhandled errors.

// // In the below function, the first parameter is the path/ search the file. if the file doesn't exist, the function will create the file and add the data present in the 2nd parameter. The 3rd parameter is the callback function.

// // function fileWrite(){
//     fs.writeFile('activity.log',`Log Start At ${getCurrentTime()}\n`, (err) => {  
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("File created successfully");
//       append(); // it will append the file, after it is created 
//     }
//   });
// }

// fileWrite(); // function to call for creating the activity.log file



const fs = require('fs');

function fileWrite(){
    fs.writeFile('activity.log', `Log starts at ${getCurrentTime()}\n`, (err) => {
        if(err) { console.log(err);}
        else { console.log('File created successfully.');
            append();
        }
    })
}

function getCurrentTime(){
    const time = new Date().toISOString();
    return time;
}

function append(){
    setInterval(() => {
        fs.appendFile('activity.log', `Log entry at ${getCurrentTime()}\n`, (err) => {
            if(err) { console.log(err);}
            else { console.log(`Log appended: Log entry at ${getCurrentTime()}`)}
        })
    }, 10000);
}

fileWrite();