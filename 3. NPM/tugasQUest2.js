const validator = require('validator');
const readline = require('readline');
let quest = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

var nama1 = '';
var email1 = '';
var nohp1 = '';

let name = () => {
    return new Promise((resolve, reject) => {
        quest.question(`Nama kamu? `, (nama) =>{
            nama1 = nama;
            resolve();
        })
    })
}

let emails = () => {
    return new Promise((resolve, reject) => {
        quest.question(`Email kamu? `, (email) =>{
            if (validator.isEmail(email)==false){
                console.log(`Mohon ulangi, Email kamu salah/typo`)
                emails();
            }else{
                email = email1;
                nomorhape();
                resolve();
            }
        })
    })
}

let nomorhape = () => {
    return new Promise((resolve, reject) => {
        quest.question(`No HP kamu? `, (nohp) =>{
            if (validator.isMobilePhone(nohp)==false){
                console.log(`Mohon ulangi, no hp salah`);
                nomorhape();
            }else{
                nohp = nohp1;
                console.log();
                console.log(`Hai ${nama1}... email kamu adalah ${email1}, dan nomor HP kamu adalah ${nohp1}.`);
                resolve();
                quest.close();
            }
        })
    })
}

const allFunction = async () => {
    await name();
    await emails();
    await nomorhape();
}

allFunction()