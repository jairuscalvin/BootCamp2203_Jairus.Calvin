import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom'
import Images from '../Images/jay.jpg'


export default function Navbar() {

    const navigate = useNavigate()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' color='transparent'>
                <Container>
                    <Toolbar>
                        <Typography variant='h6' sx={{ flexGrow:1 }}>
                            <h2 style={{
                                color:'white'
                            }}>
                                JairusHope Cafe
                            </h2>
                        </Typography>
                        <Typography variant='h6' sx={{ flexGrow:1 }}>
                            <Link to="/products/list" style={{ textDecoration: "none", color: "#eee", marginRight: "4rem" }}>Products</Link>
                            <Link to="/costumers/list" style={{ textDecoration: "none", color: "#eee", marginRight: "4rem" }}>Costumers</Link>
                            <Link to="/costumers/list" style={{ textDecoration: "none", color: "#eee" }}>Sold</Link>
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            <Avatar 
                                alt="Jay" 
                                src={Images}
                                className="logo"
                                sx={{ width: '3.5rem', height: '3.5rem' }}
                            />
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}