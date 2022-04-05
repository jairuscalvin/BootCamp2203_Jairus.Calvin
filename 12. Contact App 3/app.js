const express = require('express')
var expressLayouts = require('express-ejs-layouts')
const { url } = require('inspector')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const app = express()
const port = 3000

//memberikan folder styles menjadi statis
app.use(express.static(__dirname + '/public'));

//pengecekan file json jika tidak ada data
const dirPath='./data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}
//membuat file json jika tidak ada data
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8');
}

//membaca file json yg sudah ada
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json','utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const details = (name) => {
    const contacts = loadContact();
    let find = contacts.find((contact) => contact.name === name);
    return find;
}

//instalation EJS dengan views
app.set('view engine','ejs') 
app.use(expressLayouts)
app.set("layout extractScripts", true)
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })

//routes
app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    const nama = 'Jairus Calvin'
    let index = 1
    const kontak = loadContact();
    res.render('index', {
        title: 'Home',
        nama,
        index,
        kontak,
        layout: 'layouts/main-layouts',
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        layout: 'layouts/main-layouts',
    })
})
app.get('/contact', (req, res) => {
    let index = 1
    const contact = loadContact();
    res.render('contact', {
        title: 'Contact',
        index,
        contact,
        layout: 'layouts/main-layouts',
    })
})
app.get('/details/:name', (req, res,) => {
    const nama = 'Jairus Calvin'
    const kontak = details(req.params.name);
    
    res.render('details', {
        title: 'Details',
        nama,
        kontak,
        layout: 'layouts/main-layouts',
    })
})
app.get('/product/:product_id', (req, res) => {
    res.send('product id : ' + req.params.product_id + '<br> category id : ' + req.query.category)
})

//error routes
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h2>404 - Page Not Found!!</h2>');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})