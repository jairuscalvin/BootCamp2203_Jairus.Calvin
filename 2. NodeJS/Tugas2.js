let zodiak = '';
let sifat = ["Baik","Pemarah","Cemburuan","Perhatian"];
let random = sifat[Math.floor(Math.random() * sifat.length)];
const { rejects } = require('assert');
const { resolve } = require('path');
const readline = require('readline');
let quest = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("---Ramalan Sifat Kamu---");
console.log();
quest.question("Nama Kamu : ", function(nama) {
    quest.question("Tanggal Lahir Kamu : ", function(tgl){
        quest.question("Bulan Lahir Kamu(1-12) : ", function(bulan){
            let switchBulan = () => {
                return new Promise((resolve, reject) => {
                    switch (bulan){
                        case 1:
                            zodiak = "Capricorn";
                            resolve();
                            break;
                        case 2:
                            zodiak = "Aquarius";
                            resolve();
                            break;
                        case 3:
                            zodiak = "Pisces";
                            resolve();
                            break;
                        case 4:
                            zodiak = "Aries";
                            resolve();
                            break;
                        case 5:
                            zodiak = "Capricorn";
                            break;
                        case 6:
                            zodiak = "Aquarius";
                            break;
                        case 7:
                            zodiak = "Pisces";
                            break;
                        case 8:
                            zodiak = "Aries";
                            break;
                        case 9:
                            zodiak = "Capricorn";
                            break;
                        case 10:
                            zodiak = "Aquarius";
                            break;
                        case 11:
                            zodiak = "Pisces";
                            break;
                        case 12:
                            zodiak = "Aries";
                            break;
                    }
                })
            }
            quest.question("Tahun Lahir Kamu : ",function(tahun){
                console.log();
                console.log(`Hai Sayang ${nama}, menurut data kelahiran kamu : ${tgl}-${bulan}-${tahun}`);
                console.log(`Zodiak kamu adalah`+ switchBulan(zodiak));
                console.log(`Sepertinya kamu orangnya `+random);
                console.log();
                quest.close();
            });
        });
    });
});

quest.on("close", function() {
    console.log("\nTerima Kasih...  :)");
    process.exit(0);
});