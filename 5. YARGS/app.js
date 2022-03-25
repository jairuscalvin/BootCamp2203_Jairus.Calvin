
// const contacts = require ('./contacts');

// const main = async () => {
//     const name = await contacts.Wquestions('What is your name? ');
//     const phone = await contacts.Wquestions('Your number? ');
//     const email = await contacts.Wquestions('Your email? ');

    
//     contacts.saveContacts(name, phone, email);   

    
// };

// main();

const contacts = require('./contacts.js')
const { parse } = require("yargs");
const yargs = require("yargs");

yargs.command({
    command:'add',
    describe:'add new contact',
    builder:{
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'String',
        },
        email: {
            describe: 'Contact Email',
            demandOption: false,
            type: 'string',
        },
        phone: {
            describe: 'Contact Phone Number',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.saveContacts(argv.name,argv.email,argv.phone);
        const contact = {
            name:argv.name,
            email:argv.email,
            phone:argv.phone,
        };

        console.log(contact);

    },
});

yargs.parse();