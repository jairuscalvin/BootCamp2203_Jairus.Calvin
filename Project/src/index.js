const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const productRoute = require('./routes/product.routes')

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use(productRoute)

app.listen(port, (err) => {
    if (err) throw err
    console.log('Server is listening on port 3000')
})
