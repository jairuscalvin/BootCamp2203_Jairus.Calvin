const validator = require('validator');
const readline = require('readline');
let quest = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

quest.question(`Siapa nama anda? `, (nama) => {
    quest.question(`Email anda? `, (email) => {
        validator.isEmail(email);
        if (validator.isEmail(email) == true){
            quest.question(`Nomor HP anda? `, (nohp) => {
                if (validator.isMobilePhone(nohp) == true){
                    console.log();
                    console.log(`Terima kasih ${nama}, email anda adalah ${email}, dan nomor hp anda ${nohp}`);
                    quest.close();
                }else{
                    console.log(`Nomor HP anda salah!`);
                    quest.close();
                }
            });
        }else{
            console.log(`Email tidak sesuai!`);
            quest.close();
        }
    });
});