import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './home.scss'
import Data from './Data'
import { Link } from 'react-router-dom'
import infoIcon from '../../img/info.png'
import updateIcon from '../../img/update.png'
import deleteIcon from '../../img/delete.png'
import addIcon from '../../img/add.png'


const HomeApp = () => {

        const [contacts, setContacts] = useState([])
  
        const loadContact = () => {
            axios.get('http://localhost:3000/contacts')
            .then((res) => {
            setContacts(res.data)
            console.log(contacts)
            })
        };
        useEffect(() => {
            loadContact()
        },[])

        function deleteContact(id){
            axios.delete(`http://localhost:3000/contacts/${id}`).then(loadContact())
          }

        return (
            <React.Fragment>
                <h2>Home Page - Contacts</h2>
                <a className='add-contact' href="add-contact" ><img src={addIcon} alt="Add Contact" /></a>
                <table>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>No HP</th>
                        <th>Action</th>
                    </tr>
                    {contacts.map((contact) => (
                        <tr>
                            <Data
                                id={contact.id}
                                Nama={contact.Nama}
                                Email={contact.Email}
                                NoHP={contact.NoHP}
                            />
                            
                            <td>
                                <Link className='buttonHome' to={`/contacts/${contact.id}`}><img src={infoIcon} alt="Detail" /></Link>
                                <Link className='buttonHome' to={`/edit-contacts/${contact.id}`}><img src={updateIcon} alt="Update" /></Link>
                                <a href="" onClick={() => deleteContact(contact.id)}><img src={deleteIcon} alt="Delete" /></a>
                            </td>
                        </tr>
                    ))}
                </table>
            </React.Fragment>
        )
    }

export default HomeApp