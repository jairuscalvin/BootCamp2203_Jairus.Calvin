import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './detailContact.scss'

function DetailContact() {

    const [contact, setContact] = useState()

    useEffect(() => {
        axios.get(`http://localhost:3000/contacts/${id}`)
        .then((res) => {
          setContact(res.data)
          console.log(contact)
        })
    },[])

    const {id} = useParams()


  return (
    <div className='container-detail'>
      <h2>Detail Contact</h2>
        {contact && (
          <>
          <div className="data-contact">
            <span>Nama</span>
            <h3>{contact.Nama}</h3>
          </div>

          <div className="data-contact">
            <span>Email</span>
            <h4>{contact.Email}</h4>
          </div>

          <div className="data-contact">
            <span>No HP</span>
            <h6>{contact.NoHP}</h6>
          </div>

          {/* <button className='button-detail'><Link to={`/`}><span>Kembali</span></Link></button> */}
          
          </>
        )}
    </div>
  )
}

export default DetailContact