const validator = require('validator');
const readline = require('readline');
let quest = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

quest.question(`Siapa nama anda? `, (nama) => {
    quest.question(`Email anda? `, (email) => {
        validator.isEmail(email);
            if (validator.isEmail(email) == false){
                console.log();
                console.log(`ALERT!! Email yang anda masukan salah`);
                console.log(`Silahkan Coba Lagi`);
                quest.close();
                process.exit();
            }

        quest.question(`Nomor HP anda? `, (nohp) => {            
            validator.isMobilePhone(nohp);
            if (validator.isEmail(nohp) == false){
                console.log();
                console.log(`ALERT!! Nomor yang anda masukan bukan nomor local`);
                console.log(`Silahkan Coba Lagi`);
                quest.close();
                process.exit();
            }

            console.log(`Terima kasih ${nama}, email anda adalah ${email}, dan nomor hp anda ${nohp}`);
            quest.close();
        });
    });
});