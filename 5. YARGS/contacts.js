const fs = require('fs');
const validator = require('validator');
var email1 = '';
// const readline = require('readline');
// let rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

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

    const duplicate = contacts.find((contact) => contact.name === name);
    const validatorEMail = validator.isEmail(email) == false;
    const validatorPhone = validator.isMobilePhone(phone, 'id-ID') == false;
    if(duplicate) {
        console.log('Contact name is already recorded. Use another contact name.');
        return false;
    }

    if(typeof email === !null){
        if (validator.isEmail(email) == false) {
            console.log('Email salah!');
            return false;
        }
    }
    
    if(typeof phone === !null){
        if (validator.isMobilePhone(phone) == false) {
            console.log('Nomor Hp Salah!');
            return false;
        }
    }

    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('Thank You');
 }

 module.exports = {Wquestions, saveContacts}