const fs = require('fs');
const http = require('http');
const port = 3000;
const renderPath = (path, res) => {
    fs.readFile(path ,(err,data)=>{
        if(err){
            res.writeHead(404);
            res.write('Error : Page Not Found!');
        }else{
            res.write(data);
        }
        res.end();
    })
};

http
    .createServer((req,res) => {
        const url = req.url;
        console.log(url);

            if(url==='/about'){
                renderPath('./about.html', res);
            }else if(url==='/contact'){
                renderPath('./contact.html', res);
            }else{
                renderPath('./index.html', res);
            }

        res.writeHead(200,{
            'Content-Type' : 'text/html'
        });
    })
    
    .listen(port,() => {
        console.log('Server is listening on port 3000');
    });