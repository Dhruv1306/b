const fs = require('fs');

const comment = fs.readFileSync('./data.txt', "utf-8");
console.log(comment.split('\n')[0]);

// Line 1