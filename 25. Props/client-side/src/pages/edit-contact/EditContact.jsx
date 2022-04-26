import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditContact() {

    const [Nama, setNama] = useState("")
    const [Email, setEmail] = useState("")
    const [NoHP, setNohp] = useState("")
  
    
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3000/contacts/${id}`)
        .then((res) => {
          setNama(res.data.Nama)
          setEmail(res.data.Email)
          setNohp(res.data.NoHP)
        })
    },[])

    const contact = {Nama, Email, NoHP}

    function updateContact(e) {
      e.preventDefault()
      axios.put(`http://localhost:3000/contacts/${id}`, contact).then(navigate('/'))
    }

  return (
    <div className='container-form'>
        <form>
          <div className="input-contact">
            <label>Nama</label>
            <input 
              value={Nama}
              onChange={(e) => setNama(e.target.value)}
            type="text"/>
          </div>
          <div className="input-contact">
            <label>Email</label>
            <input
              value={contact.Email}
              onChange={(e) => setEmail(e.target.value)}
            type="text" />
          </div>
          <div className="input-contact">
            <label>No Handphone</label>
            <input
              value={contact.NoHP}
              onChange={(e) => setNohp(e.target.value)}
            type="text" />
          </div>
          <div className="input-contact">
            <button onClick={updateContact}>Submit</button>
          </div>
        </form>
    </div>
  )
}

export default EditContact