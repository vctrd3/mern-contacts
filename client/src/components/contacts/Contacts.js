import React, { Fragment, useContext } from 'react'
import ContactContext from '../../contexts/contact/contactContext'
import ContactItem from './ContactItem'

const Contacts = () => {
  const { contacts } = useContext(ContactContext)
  
  return (
    <Fragment>
      {contacts.map(contact => <ContactItem contact={contact} key={contact.id} />)}
    </Fragment>
  )
}

export default Contacts
