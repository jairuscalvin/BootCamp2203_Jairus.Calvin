import { Button, Card, CardContent, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Home() {
    
    const [product, setProduct] = useState([])
    const navigate = useNavigate()

    const loadProduct = async () => {
        const res = await fetch("http://localhost:3000/product/list")
        const data = await res.json()

        setProduct(data)
    }

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/product/${id}`, {
                method: "DELETE",
            })
            console.log(res)
            setProduct(product.filter((product) => product.id !== id))
            
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        loadProduct()
    }, [])

    return (
        <>
            <Button
                variant='contained'
                color='success'
                align='right'
                style={{
                    marginTop:'1.5rem',
                    marginLeft:'60rem'
                }}
                onClick={ () => navigate('/products/add')}>
                Add Product
            </Button>
            {
                product.map(product => (
                    <Card style={{
                        marginTop: "1rem",
                        marginBottom: "0.7rem",
                        backgroundColor: "#1e272e"
                    }}>
                        <CardContent style={{
                            display:'flex',
                            justifyContent:'space-between',
                        }}>

                            <div style={{
                                color:'white'
                            }}>
                                <Typography>{product.nama}</Typography>
                                <Typography>{product.deskripsi}</Typography>
                                <Typography>{product.tahun}</Typography>
                                <Typography>{product.harga}</Typography>
                            </div>

                            <div style={{
                                display:'flex',
                                padding:'1.5rem 1rem'
                            }}>
                                <Button
                                    variant="outlined" 
                                    color="primary"
                                    onClick={() => navigate(`/products/list/${product.id}/edit`)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outlined" 
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDelete(product.id)}
                                    style={{
                                        marginLeft:'1rem'
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}