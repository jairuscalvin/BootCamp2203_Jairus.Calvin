const express = require('express')
var expressLayouts = require('express-ejs-layouts')
const { url } = require('inspector')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const app = express()
const port = 3000
const { body, validationResult, check } = require('express-validator');
const session = require ('express-session')
const cookieParser = require ('cookie-parser')
const flash = require ('connect-flash')

//memberikan folder styles menjadi statis
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true})) //menampilkan console hasil inputan

//menggunakan messages flash
app.use(cookieParser('secret'))
app.use(
    session({
        cookie : {maxAge : 6000},
        secret : 'secret',
        resave : true,
        saveUninitialized : true
    })
)
app.use(flash())

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

const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

const details = (name) => {
    const contacts = loadContact();
    let find = contacts.find((contact) => contact.name === name);
    return find;
}

const store = (name) => {
    let contacts = loadContact();
    let duplicate = contacts.find((contact) => contact.name === name);
    
    if(duplicate) {
        console.log('Kontak sudah ada');
        return false;
    }

    const push = contacts.push(name);
    if (push.length < 1){
        console.log('error');
    }else{
        fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts))
    }
}

const cekDuplikat = (name) => {
    const contacts = loadContact()
    return contacts.find((contact) => contact.name === name ) 
}

const destroy = (name) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.name !== name
    );

    saveContacts(newContacts)
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

//----------------------routes home
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
//----------------------routes about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        layout: 'layouts/main-layouts',
    })
})
//----------------------routes contact
app.get('/contact', (req, res) => {
    let index = 1
    const contact = loadContact();
    res.render('contact', {
        title: 'Contact',
        index,
        contact,
        layout: 'layouts/main-layouts',
        msg: req.flash('msg'),
    })
})
app.get('/add-contact', (req, res) => {
    res.render('add-contact', {
        title: 'New Contact',
        layout: 'layouts/main-layouts',
    })
})
//----------------------routes proses post data
app.post('/store',
[
    body('name').custom((value, {req}) => {
        const duplicate = cekDuplikat(value)
        console.log(duplicate)
        if (duplicate) {
            throw new Error('Nama ini sudah digunakan')
        }
        return true
    }),
    check('phone', 'nomor tidak ditemukan!').isMobilePhone('id-ID'),
    check('email', 'email tidak valid!').isEmail()
],
    (req, res) => {
    const err = validationResult(req)
    if(!err.isEmpty()){
        // return res.status(400).json({ errors: err.array()})
        res.render('add-contact', {
            title: 'New Contact',
            layout: 'layouts/main-layouts',
            err: err.array(), 
        })
    }else{
        store(req.body)
        req.flash('msg', 'Data berhasil ditambahkan')
        res.redirect('/contact')
    }    
})
//----------------------routes details contact
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
//----------------------routes DELETE contact
app.get('/contact/delete/:name', (req, res,) => {
    const kontak = destroy(req.params.name);
    if(kontak) {
        req.flash('msg', 'Gagal Hapus!')
        res.redirect('/contact')
    }else{
        req.flash('msg', 'Berhasil dihapus')
        res.redirect('/contact')
    }
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