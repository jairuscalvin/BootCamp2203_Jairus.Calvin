import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            style={{color:'white'}}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{color:'white'}}>
          {row.name}
        </TableCell>
        <TableCell align="right" style={{color:'white'}}>{row.calories}</TableCell>
        <TableCell align="right" style={{color:'white'}}>{row.fat}</TableCell>
        <TableCell align="right" style={{color:'white'}}>{row.carbs}</TableCell>
        <TableCell align="right" style={{color:'white'}}>{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" style={{color:'white'}}>
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{color:'white'}}>Date</TableCell>
                    <TableCell style={{color:'white'}}>Customer ID</TableCell>
                    <TableCell align="right" style={{color:'white'}}>Total Unit</TableCell>
                    <TableCell align="right" style={{color:'white'}}>Total Harga ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row" style={{color:'white'}}>
                        {historyRow.date}
                      </TableCell>
                      <TableCell style={{color:'white'}}>{historyRow.customerId}</TableCell>
                      <TableCell align="right" style={{color:'white'}}>{historyRow.amount}</TableCell>
                      <TableCell align="right" style={{color:'white'}}>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Jairus Calvin', 'jairus@gmail.com', 'Bandung Barat', '08112398512', 'Aktif'),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function Costumer() {

    const navigate = useNavigate()

  return (

    <>
        <div>
            <Button
                variant='contained'
                color='success'
                align='right'
                style={{
                    marginTop:'1.5rem',
                    marginLeft:'60rem'
                }}
                onClick={ () => navigate('/costumers/add')}
                >
                New Costumer
            </Button>
        </div>
        <div style={{marginTop:'1rem'}}>
            <TableContainer style={{
                backgroundColor:'#1e272e'
                }} component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow style={{color:'white'}}>
                        <TableCell style={{color:'white'}}/>
                        <TableCell style={{color:'white'}}>Costumer Name</TableCell>
                        <TableCell style={{color:'white'}}>Email</TableCell>
                        <TableCell style={{color:'white'}}>Addres</TableCell>
                        <TableCell style={{color:'white'}}>Phone</TableCell>
                        <TableCell style={{color:'white'}}>Status</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row}/>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </>
  );
}
