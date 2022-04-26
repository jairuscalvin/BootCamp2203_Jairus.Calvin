import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './addContact.scss'
import backIcon from '../../img/back.png'

function AddContact() {

  const [Nama, setNama] = useState('')
  const [Email, setEmail] = useState('')
  const [NoHP, setNohp] = useState('')

  const contact = {Nama, Email, NoHP}

  const navigate = useNavigate()

  function Submit(e){
    e.preventDefault()

    axios.post(`http://localhost:3000/contacts`, contact).then(navigate('/'))
  }
  
  
  return (
    
    <div className='container-form'>
      <a href="/" ><img src={backIcon} alt="Add Contact" /></a>
      
      <h1>Form Add Contact</h1>
        <form>
          <div className="input-contact">
            <label htmlFor="">Nama</label>
            <input 
              value={Nama}
              onChange={(e) => setNama(e.target.value)}
            type="text" placeholder='Masukan nama anda'/>
          </div>
          <div className="input-contact">
            <label htmlFor="">Email</label>
            <input
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            type="text" placeholder='Masukan email anda'/>
          </div>
          <div className="input-contact">
            <label htmlFor="">No Handphone</label>
            <input
              value={NoHP}
              onChange={(e) => setNohp(e.target.value)}
            type="text" placeholder='Masukan No HP anda'/>
          </div>
          <div className="input-contact">
            <button onClick={Submit}>Submit</button>
          </div>

        </form>
    </div>
  )
}

export default AddContact