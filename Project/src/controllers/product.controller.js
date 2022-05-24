const pool = require('../db')

const getAll = async (req, res) => {
    try {
        const { rows : result } = await pool.query("SELECT * from product")

        res.json(result)

    } catch (error) {
        console.error(error.message)
    }
}

const createProduct = async (req, res) => {
    try {
        const { nama,deskripsi,tahun,harga } = req.body
        const { gambar } = req.file

        // if({gambar}) {
        //     let finalImageURL = 
        //     req.protocol + "://" + req.get("host") + "/uploads/product/" + req.file.filename
        //     res.json({ image: finalImageURL })
            
        // }
        const {rows:result} = await pool.query(`INSERT INTO product (nama, deskripsi, tahun, harga, gambar) VALUES ('${nama}', '${deskripsi}', '${tahun}', '${harga}', '${gambar}') RETURNING *`)
        console.log(result)
    } catch (error) {
        console.error(error.message)
    }
}

const uploadImage = async (req, res) => {
    try {
        let finalImageURL = 
        req.protocol + "://" + req.get("host") + "/uploads/product/" + req.file.filename
        res.json({ status:"success", image: finalImageURL })
    } catch (error) {
        console.error(error.message)
    }
}

const details = async (req, res) => {
    try {
        const {id} = req.params
        const {rows:result} = await pool.query(`SELECT * FROM product WHERE id = '${id}'`)

        if (result.length === 0) {
            res.status(404).json({
                message: "Tidak ada"
            })
        }

        res.json(result)

    } catch (error) {
        console.error(error.message)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params
        const {rows:result} = await pool.query(`DELETE FROM product WHERE id = '${id}'`)

        res.json('Berhasil di hapus')
        res.redirect('/home', getAll)

    } catch (error) {
        console.error(error.message)
    }
}

const updateProduct = async (req, res) => {
    try {  
        const {id} = req.params
        const {nama,deskripsi,tahun,harga,gambar} = req.body

        const {rows:result} = await pool.query(`
        UPDATE product SET nama='${nama}', deskripsi='${deskripsi}', tahun='${tahun}', harga='${harga}', gambar='${gambar}' 
        WHERE id = '${id}'
        `)

        res.json('Berhasil update data!')

    } catch (error) {
        console.error(error.message)
    }
}

module.exports = {
    getAll,
    details,
    createProduct,
    deleteProduct,
    updateProduct
}