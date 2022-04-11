const express = require('express')
const app = express()
const pool = require('./db')
const port = 3000

app.use(express.json())

//routes add data
app.get('/add', async (req, res) => {
    try {
        const name = 'laskd'
        const phone = '082291238491'
        const email = 'may@gmail.com'
        const newCont = await pool.query(`
        INSERT INTO contacts values('${name}','${phone}','${email}') RETURNING *
        `)
        res.json(newCont.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//routes list contact
app.get('/list', async (req, res) => {
    try {
        const list = await pool.query(`
        SELECT *
        FROM contacts
        `)
        res.json(list.rows)
    } catch (err) {
        console.error(err.message)
    }  
})

//routes details contact
app.get('/details/:name', async (req, res) => {
    try {
        const name = (req.params.name)
        const Details = await pool.query(`
        SELECT *
        FROM contacts
        WHERE name='${name}'
        `)
        const count = (Details.rowCount)
        if (count >0){
            res.json(Details.rows)
            console.log(Details.rows)
        }else{
            res.send('Data tidak ada')
            console.log('Data tidak ada')
        }
        
    } catch (err) {
        
        console.error(err.message)
    }  
})

//routes delete contact
app.get('/delete/:name', async (req, res) => {
    
    try {
        const name = (req.params.name)
        const deleted = await pool.query(`
        DELETE from contacts
        WHERE name='${name}'
        `)
        const Details = await pool.query(`
        SELECT *
        FROM contacts
        `)
        const count = (deleted.rowCount)
        if (count <1) {
            res.send('Data Berhasil Dihapus')
            res.json(Details.rows)
        } else {
            res.send('Nama salah!')
        }
    } catch (err) {
        console.error(err.message)
    }
})

//routes update contact
app.get('/update/:name', async (req, res) => {
    try {
        const name = (req.params.name)
        const phone = '081201235081'
        const email = 'jairuscalvin@gmail.com'

        //Memanggil data yang sudah ada sebelum diupdate
        const { rows : oldCont } = await pool.query(`
        SELECT * from contacts
        WHERE name='${name}'
        `)

        //Update data tersebut
        const update = await pool.query(`
        UPDATE contacts 
        SET phone ='${phone}', email ='${email}' 
        WHERE name='${name}'
        `)

        //Memanggil data yang sudah diupdate
        const { rows : newCont} = await pool.query(`
        SELECT * from contacts
        WHERE name='${name}'
        `)

        //output
        res.json({oldCont, newCont})
        console.log(newCont)
    } catch (err) {
        console.error(err.message)
    }   
})

//error routes
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h2>404 - Page Not Found!!</h2>');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})