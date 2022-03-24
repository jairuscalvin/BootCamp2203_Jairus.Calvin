const fs = require('fs');
const readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const dirPath='./data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8');
}

const Wquestions = (ask) => {
    return new Promise((resolve, reject) => {
        rl.question(ask, (name) => {
            resolve(name);
        })
    })
};
const saveContacts = (name, phone, email) => {
    const contact = {name, phone, email};
    const file = fs.readFileSync('data/contacts.json','utf-8');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('Thank You');
    rl.close();
 }

 module.exports = {Wquestions, saveContacts}