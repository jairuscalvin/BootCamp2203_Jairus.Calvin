const express = require('express')
const app = express()
const pool = require('./db')
const port = 3000

app.use(express.json())

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})