import React, { useReducer } from 'react'
import {v4} from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {ADD_CONTACT,DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT,UPDATE_CONTACT,FILTER_CONTACTS,CLEAR_FILTER} from '../types'


const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id:1,
        name: 'Test One',
        email: 'test@one.com',
        phone:'111-111-1111',
        type: 'professional'
      },
      {
        id:2,
        name: 'Test Two',
        email: 'test@two.com',
        phone:'222-222-2222',
        type: 'personal'
      },
      {
        id:3,
        name: 'Test Three',
        email: 'test@three.com',
        phone:'333-333-3333',
        type: 'professional'
      }
    ],
    current: null
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  //add contact
  const addContact = (contact) => {
    contact.id = v4()
    dispatch({ type: ADD_CONTACT, payload: contact})
  }

  //delete contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id})
  }

  //set current contact
  const setCurrent = contact => {
    dispatch({type: SET_CURRENT, payload: contact})
  }

  //clear current contact
  const clearCurrent = () => {
    dispatch({type: CLEAR_CURRENT })
  }

  //update contact
  const updateContact = contact => {
    dispatch({type: UPDATE_CONTACT, payload: contact})
  }

  //filter contact

  //clear filter

  return (<ContactContext.Provider value={{
    contacts: state.contacts,
    current: state.current,
    clearCurrent,
    setCurrent,
    addContact,
    deleteContact,
    updateContact
    }}>
    {props.children}
  </ContactContext.Provider>)
}

export default ContactState