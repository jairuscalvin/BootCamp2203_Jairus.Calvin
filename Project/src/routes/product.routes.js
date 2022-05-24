const { Router } = require('express')
const multer = require('multer')
const { getAll, details, deleteProduct, updateProduct, createProduct } = require('../controllers/product.controller')

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/")
    },
    filename: function (req, file, cb) {
        cb(
            null,
            path.parse(file.originalname).name +
            "-" +
            Date.now() +
            path.extname(file.originalname)
        )
    }
})
const upload = multer({ storage: storage })

router.get('/product/list', getAll)
router.get('/product/:id', details)
router.post('/product/create', createProduct)
router.delete('/product/:id', deleteProduct)
router.put('/product/:id', updateProduct)

module.exports = router