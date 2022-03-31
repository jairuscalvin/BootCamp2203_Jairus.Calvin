const readline = require('readline');
let quest = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

quest.question(`Siapa nama anda? `, (nama) => {
    quest.question(`Email anda? `, (email) => {
        quest.question(`Nomor HP anda? `, (nohp) => {
            console.log();
            console.log(`Terima kasih ${nama}, email anda adalah ${email}, dan nomor hp anda ${nohp}`);
            quest.close();
        });
    });
});