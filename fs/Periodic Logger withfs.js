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