let sifat = ["Baik","Pemarah","Cemburuan","Perhatian"];
let random = sifat[Math.floor(Math.random() * sifat.length)];
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
            quest.question("Tahun Lahir Kamu : ",function(tahun){
                console.log();
                console.log();
                console.log(`Hai Sayang ${nama}, menurut data kelahiran kamu : ${tgl}-${bulan}-${tahun}`);
                console.log();
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