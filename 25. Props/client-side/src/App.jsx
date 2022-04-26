import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/HomeApp'
import DetailContact from './pages/detail-contact/DetailContact'
import AddContact from './pages/add-contact/AddContact'
import EditContact from './pages/edit-contact/EditContact'

function App() {

  return (
    <div className="App">
      <Navbar />
      
      <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home/>} />
        </Route>
        <Route path='/contacts/:id'>
          <Route index element={<DetailContact/>} />
        </Route>
        <Route path='/add-contact'>
          <Route index element={<AddContact />} />
        </Route>
        <Route path='/edit-contacts/:id'>
          <Route index element={<EditContact />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
