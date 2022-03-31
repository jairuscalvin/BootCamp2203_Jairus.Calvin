// const fs = require('fs');
// const http = require('http');
// const port = 3000;
// const renderPath = (path, res) => {
//     fs.readFile(path ,(err,data)=>{
//         if(err){
//             res.writeHead(404);
//             res.write('Error : Page Not Found!');
//         }else{
//             res.write(data);
//         }
//         res.end();
//     })
// };

// http
//     .createServer((req,res) => {
//         const url = req.url;
//         console.log(url);

//             if(url==='/about'){
//                 renderPath('./about.html', res);
//             }else if(url==='/contact'){
//                 renderPath('./contact.html', res);
//             }else{
//                 renderPath('./index.html', res);
//             }

//         res.writeHead(200,{
//             'Content-Type' : 'text/html'
//         });
//     })
    
//     .listen(port,() => {
//         console.log('Server is listening on port 3000');
//     });

const express = require('express')
const { url } = require('inspector')
const app = express()
const port = 3000

//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/about', (req, res) => {
    res.sendFile('/about.html', {root: __dirname})
})
app.get('/contact', (req, res) => {
    res.sendFile('/contact.html', {root: __dirname})
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