
const contacts = require ('./contacts');

const main = async () => {
    const name = await contacts.Wquestions('What is your name? ');
    const phone = await contacts.Wquestions('Your number? ');
    const email = await contacts.Wquestions('Your email? ');

    
    contacts.saveContacts(name, phone, email);   

    
};

main();