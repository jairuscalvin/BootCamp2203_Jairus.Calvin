const express = require('express')
const { url } = require('inspector')
const app = express()
const port = 3000

//instalation EJS dengan views
app.set('view engine','ejs')

//routes
app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    const user = [
        {
        nama : 'Jairus Calvin',
        umur : 15,  
        }
    ];
    res.render('index', {
        user : user, 
        tittle: 'Home'})
})
app.get('/about', (req, res) => {
    res.render('about')
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