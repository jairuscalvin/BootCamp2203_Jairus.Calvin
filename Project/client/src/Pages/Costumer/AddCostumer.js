import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddCostumer() {

    const [product, setProduct] = useState({
        nama: "",
        deskripsi: "",
        tahun: "",
        harga: "",
    })

    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const navigate = useNavigate()
    const params = useParams()

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
            const res = await fetch("http://localhost:3000/product/create", {
                method: "POST",
                body: JSON.stringify(product),
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
        }

        setLoading(false)
        navigate('/products/list')
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
                                    rows={4}
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

                            {/* ))
                        } */}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}