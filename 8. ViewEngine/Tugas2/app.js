const fs = require('fs')
const mycss = fs.readFileSync('./style.css', 'utf8')
const express = require('express')
const { url } = require('inspector')
const app = express()
const port = 3000

//instalation EJS dengan views
app.set('view engine','ejs')

//routes
app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    const nama = 'Jairus Calvin'
    let index = 1
    const kontak = [
        {
        nama : 'Jairus Calvin',
        email : 'jairus@gmail.com',  
        nohp : '082384471810',
        },
        {
        nama : 'Aris Prihantoro',
        email : 'aris@gmail.com',  
        nohp : '08238447166',
        },
        {
        nama : 'Mercy Livia',
        email : 'mercy@gmail.com',  
        nohp : '082554471810',
        },
    ]
    res.render('index', {
        mycss,
        tittle: 'Home',
        nama,
        index,
        kontak,
    })
})
app.get('/about', (req, res) => {
    res.render('about','style')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/product/:product_id', (req, res) => {
    res.send('product id : ' + req.params.product_id + '<br> category id : ' + req.query.category)
})

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h2>404 - Page Not Found!</h2>');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})