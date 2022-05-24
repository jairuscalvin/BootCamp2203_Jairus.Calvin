import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import List from "./components/Home";
import AddForm from "./components/AddForm";
import { Container } from '@mui/material';
import CostumerList from './Pages/Costumer/CostumerList';
import AddCostumer from './Pages/Costumer/AddCostumer';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
        <Container>
          <Routes>
            <Route path='/products/list' element={<List />} />
            <Route path='/products/add' element={<AddForm />} />
            <Route path='/products/list/:id/edit' element={<AddForm />} /> 

            <Route path='/costumers/list' element={<CostumerList />} />
            <Route path='/costumers/add' elemt={<AddCostumer /> } />
          </Routes>
        </Container>
    </BrowserRouter>
  )
}