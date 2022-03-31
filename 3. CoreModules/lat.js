const fs = require('fs');

fs.readFile('Learn To Code.txt','utf-8', (err,data) => {
    if (err) throw err;
    console.log(data)
});
console.log(fs);