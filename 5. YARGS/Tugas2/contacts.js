const fs = require('fs');
const validator = require('validator');
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

// const Wquestions = (ask) => {
//     return new Promise((resolve, reject) => {
//         rl.question(ask, (name) => {
//             resolve(name);
//         })
//     })
// };
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json','utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const listContact = () => {
    const contacts = loadContact();
    console.log('Contact List : ');
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.name} - ${contact.phone}`);
    });
};

const saveContacts = (name, phone, email) => {
    const contact = {name, phone, email};
    // const file = fs.readFileSync('data/contacts.json','utf-8');
    // const contacts = JSON.parse(file);
    const contacts = loadContact();
    let duplicate = contacts.find((contact) => contact.name === name);
    
    //mengatasi duplikat data
    if(duplicate) {
        console.log('Contact name is already recorded. Use another contact name.');
        return false;
    }

    //validasi nomor HP indo
    if (!validator.isMobilePhone(phone, 'id-ID')) {
        console.log('Nomor Hp Salah!');
        return false;
    }

    //validasi email jika ada
    if (typeof email === !null){
        if (!validator.isEmail(email)) {
            console.log('Email salah!');
            return false;
        }
    }
    
    contacts.push(contact);
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    console.log('Thank You');
 }

const details = (named) => {
    const contacts = loadContact();
    const contact = {named};
    let find = contacts.find((contact) => contact.name === named);
    if(find){
    console.log('Details : ');
    console.log(`${find.name} - ${find.phone} - ${find.email}`);
    }else{
        console.log('Tidak ada');
        return false;
    }
}

const destroy = (name) => {
    const contacts = loadContact();
    const contact = {name};
    const newContacts = contacts.filter((newContacts) => newContacts.name !== name);
    
    console.log(newContacts.name);
    console.log(name);
    

    if(contacts.length === newContacts.length){
        console.log(contacts.length);
        console.log(newContacts.length);
        console.log('nama tidak ada');
        return false;
    }

    fs.writeFileSync('data/contacts.js', JSON.stringify(newContacts));
    console.log('Contact telah dihapus');    
};


const deleteContact = (name) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.name.toLowerCase() !== name.toLowerCase()
    );
    if(contacts.length === newContacts.length){
        console.log(`${name} not found`);
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(`${name} deleted`);
}

 module.exports = {
    saveContacts,
    listContact,
    details,
    deleteContact,
}