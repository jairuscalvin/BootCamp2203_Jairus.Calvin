import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddForm() {

    const [product, setProduct] = useState({
        nama: "",
        deskripsi: "",
        tahun: "",
        harga: "",
        barang: "",
    })
    const [nama, setNama] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const [tahun, setTahun] = useState('')
    const [harga, setHarga] = useState('')
    const [gambar, setGambar] = useState('')

    const [image, setImage] = useState("https://fakeimg.pl/350x250/")
    const [saveImage, setSaveImage] = useState(null)

    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    // const [gambar, setGambar] = useState('')
    const navigate = useNavigate()
    const params = useParams()
    // let formData = new formData()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const id = params.id
        
        if (editing) {

            const res = await fetch(`http://localhost:3000/product/${id}`, {
                method: "PUT",
                body: JSON.stringify(product),
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
        } else {
            // const data = new FormData()
            // data.append('nama', nama)
            // data.append('deskripsi', deskripsi)
            // data.append('tahun', tahun)
            // data.append('harga', harga)
            // data.append('gambar', gambar)

            // const res = await fetch("http://localhost:3000/product/create", {
            //     method: "POST",
            //     body: JSON.stringify(data),
            //     headers: { "Content-Type": "multipart/form-data" },
            // })

            // const finalResult = await res.json()
            // const res = await fetch("http://localhost:3000/product/create",  {
            //     method: "POST",
            //     body: JSON.stringify(product),
            //     headers: { "Content-Type": "multipart/form-data" },
            // })
            // const data = await res.json()
            // console.log(data)

            // const gambar = e.target.files
            const data = new FormData()
            data.append('nama', nama)
            data.append('deskripsi', deskripsi)
            data.append('tahun', tahun)
            data.append('harga', harga)
            data.append('gambar', gambar)
            
            console.log("front end "+data.gambar)
            setLoading(true)
            const res =  await fetch("http://localhost:3000/product/create", data, {
                method: "POST",
            })
            const file = await res.json()
            .then(res=> {
                
                console.log('upload berhasil', res)
            })
            .catch(err=>{
                console.log('err: ', err)
            })
            

            setImage(file.secure_url)
            setLoading(false)
        }

        setLoading(false)
        navigate('/products/list')
    }

    const handleImage = async (e) => { 
        console.log(e.target.files[0])
        let uploaded = e.target.files[0]
        setImage(URL.createObjectURL(uploaded))
        setSaveImage(uploaded)
    }

    const hadleChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
    }

    const loadProduct = async (id) => {
            const res = await fetch(`http://localhost:3000/product/${id}`)
            const data = await res.json()
            setProduct({
                nama: data.nama,
                deskripsi:  data.deskripsi,
                tahun: data.tahun,
                harga: data.harga
            })
            setEditing(true)
    }
     
    
    useEffect(() => {
        if (params.id) {
            loadProduct(params.id)
        }
    }, [params.id])



    return (
        <Grid 
            container 
            direction="column" 
            alignItems="center" 
            justifyContent="center" 
        >
            <Grid item xs={3}>
                <Card 
                sx={{mt:5}}
                style={{
                    backgroundColor: "#1e272e",
                    padding: "2rem",
                    width: "30rem",
                    }}
                >
                    <Typography variant="5" textAlign="center" color="white">
                        {editing ? "Edit Product" : "Tambah Product"}
                    </Typography>
                    <CardContent>
                    {/* {   product.map(product => ( */}

                            <form onSubmit={handleSubmit}>

                                <TextField 
                                    variant="filled"
                                    label="Nama Barang"
                                    sx={{
                                        display: "flex",
                                        margin: "1rem 0",
                                        width: "28rem",
                                    }}

                                    inputProps={{style: {color:"white"}}}
                                    InputLabelProps={{style: {color:"white"}}}  

                                    name= "nama"
                                    value={product.nama}
                                    onChange={hadleChange}
                                />

                                <TextField 
                                    variant="filled"
                                    label="Deskripsi"
                                    multiline
                                    rows={3}
                                    sx={{
                                        display: "flex",
                                        margin: "1rem 0",
                                        width: "28rem",
                                    }}

                                    inputProps={{style: {color:"white"}}}
                                    InputLabelProps={{style: {color:"white"}}}  

                                    name= "deskripsi"
                                    value={product.deskripsi}
                                    onChange={hadleChange}
                                />

                                <TextField 
                                    variant="filled"
                                    label="Tahun"
                                    multiline
                                    sx={{
                                        display: "flex",
                                        margin: "1rem 0",
                                        width: "28rem",
                                    }}

                                    inputProps={{style: {color:"white"}}}
                                    InputLabelProps={{style: {color:"white"}}}  

                                    name= "tahun"
                                    value={product.tahun}
                                    onChange={hadleChange}
                                />

                                <div>
                                    <label style={{
                                            color:'white',                                           
                                        }}>
                                            Upload Image Here!
                                    </label>
                                    <div style={{
                                        width: "15rem",
                                        height: "10rem",
                                        border: "solid 2px black",
                                        marginTop: "0.5rem",
                                    }}>
                                        <img 
                                            src={image}
                                            alt=""
                                            style={{
                                                width: "15rem",
                                                height: "10rem",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <br></br>
                                        <input 
                                            type="file"
                                            name="gambar"
                                            placeholder="Pick File"
                                            style={{
                                                color: "white",
                                            }}
                                            onChange={handleImage}
                                            accept="image/*"
                                        />
                                    </div>
                                </div>
    
                                <TextField 
                                    variant="filled"
                                    label="Harga"
                                    multiline
                                    sx={{
                                        display: "flex",
                                        margin: "1rem 0",
                                        width: "28rem",
                                    }}

                                    inputProps={{style: {color:"white"}}}
                                    InputLabelProps={{style: {color:"white"}}} 
                                    
                                    name= "harga"
                                    value={product.harga}
                                    onChange={hadleChange}
                                />

                                <Button 
                                    startIcon={<SaveIcon />}
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                    disabled={!product.nama || !product.deskripsi || !product.tahun || !product.harga}
                                    >
                                    {loading ? ( 
                                        <CircularProgress color="inherit" size={24} />
                                    ) : ( 'Save' )}
                                    
                                </Button>

                            </form>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}