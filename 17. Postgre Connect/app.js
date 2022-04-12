const express = require('express')
var expressLayouts = require('express-ejs-layouts')
const { url } = require('inspector')
const path = require('path')
const fs = require('fs')
const pool = require('./db')
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
app.use(express.json())

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

async function getAll() {
    const all = await pool.query(`
    SELECT * 
    FROM contacts
    `)
    return all
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

const destroy = (name) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.name !== name
    );

    saveContacts(newContacts)
}

const update = (newContact) => {
    const contacts = loadContact()
    const find = contacts.filter(
        (contact) => contact.name !== newContact.oldName
    )
    
    delete newContact.oldName //dihapus dulu old name yg ada di newContact
    find.push(newContact)   //lalu file yang sudah di filer akan disisipkan data newContact
    saveContacts(find)      //lalu file lama di replace dengan yang baru 
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
app.get('/', async (req, res) => {
    try {
        const nama = 'Jairus Calvin'
        let index = 1
        const {rows : kontak } = await pool.query(`
        SELECT name, email, phone
        FROM contacts
        `)
        res.render('index', {
            title: 'Home',
            nama,
            index,
            kontak,
            layout: 'layouts/main-layouts',
        })
    }catch (err) {
        console.error(err.message)
    }
})
//----------------------routes about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        layout: 'layouts/main-layouts',
    })
})
//----------------------routes contact
app.get('/contact', async (req, res) => {
    try {
        const {rows : contact } = await pool.query(`
        SELECT name, email
        FROM contacts
        `)
        let index = 1
        res.render('contact', {
            title: 'Contact',
            index,
            contact,
            layout: 'layouts/main-layouts',
            msg: req.flash('msg'),
        })
        console.log(contact)
    }catch (err) {
        console.error(err.message)
    }
})
app.get('/contact/add-contact', (req, res) => {
    res.render('add-contact', {
        title: 'New Contact',
        layout: 'layouts/main-layouts',
    })
})
//----------------------routes proses post data
app.post('/contact/store',
[
    body('name').custom((value, {req}) => {
        const select = pool.query(`
        SELECT * FROM contacts
        `)
        const cek = select.name === value
        if (cek) {
            throw new Error('Nama ini sudah digunakan')
        }
        return true
    }),
    check('phone', 'nomor tidak ditemukan!').isMobilePhone('id-ID'),
    check('email', 'email tidak valid!').isEmail()
],
    async(req, res) => {

    try {
        const err = validationResult(req)
    if(!err.isEmpty()){
        res.render('add-contact', {
            title: 'New Contact',
            layout: 'layouts/main-layouts',
            err: err.array(), 
        })
    }else{
        console.log(req.body.name)
        const newCont = await pool.query(`
        INSERT INTO contacts values('${req.body.name}','${req.body.phone}','${req.body.email}')
        `)
        req.flash('msg', 'Data berhasil ditambahkan')
        res.redirect('/contact')
    }
    } catch (err) {
        console.error(err.message)
    } 
})
//----------------------routes details contact
app.get('/details/:name', async (req, res) => {
    try {
        const name = (req.params.name)
        const {rows : select} = await pool.query(`
        SELECT name, phone, email
        FROM contacts
        WHERE name='${name}'
        `)
        select.map(kontak => {
            res.render('details', {
                title: 'Details',
                kontak,
                layout: 'layouts/main-layouts',
            })
        })
    }catch (err) {
        console.error(err.message)
    }
})
//----------------------routes DELETE contact
app.get('/contact/delete/:name', async (req, res) => {
    const deleted = await pool.query(`
    DELETE FROM contacts
    WHERE name='${req.params.name}'
    `)
    if(!deleted) {
        req.flash('msg', 'Gagal Hapus!')
        res.redirect('/contact')
    }else{
        req.flash('msg', 'Berhasil dihapus')
        res.redirect('/contact')
    }
})
//----------------------routes edit contact
app.get('/contact/edit/:name', (req, res) => {
    const kontak = details(req.params.name);

    res.render('edit', {
        title: 'Edit Kontak',
        kontak,
        layout: 'layouts/main-layouts',
    })
})
//----------------------routes update contact
app.post('/contact/update',
[
    body('name').custom((value, {req}) => {
        const select = pool.query(`
        SELECT * FROM contacts
        WHERE name='${value}'
        `)
        if (value !== req.body.oldName && select) {
            throw new Error('Nama ini sudah digunakan')
        }
        return true
    }),
    check('phone', 'nomor tidak ditemukan!').isMobilePhone('id-ID'),
    check('email', 'email tidak valid!').isEmail()
],
    async(req, res) => {
        try {
            const err = validationResult(req)
            if(!err.isEmpty()){
                res.render('edit', {
                    title: 'Form Edit',
                    layout: 'layouts/main-layouts',
                    err: err.array(), 
                    kontak: req.body,
                })
            }else{
                const update = await pool.query(`
                UPDATE contacts 
                SET name = '${req.body.name}', phone ='${req.body.phone}', email ='${req.body.email}' 
                WHERE name='${req.body.oldName}'
                `)
                req.flash('msg', 'Data berhasil diubah')
                res.redirect('/contact')
            }
        } catch (err) {
            console.error(err.message)
        }    
})
app.post('/cekboxDelete', async (req, res) => {
    let {name} = req.body
    console.log(name)
    const destroy = await pool.query(`
    DELETE FROM contacts
    WHERE name='${name}'
    `)
    if(Array.isArray(name)){
        name.forEach(kontak => {
            destroy(kontak)
            req.flash('msg', 'Beberapa berhasil dihapus')
            res.redirect('/contact')
        });
    }else{
        const del1 = await pool.query(`
        DELETE FROM contacts
        WHERE name='${name}'`)
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