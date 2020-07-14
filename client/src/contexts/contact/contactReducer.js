import { ADD_CONTACT,DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT,UPDATE_CONTACT,FILTER_CONTACTS,CLEAR_FILTER} from '../types'

export default (state, action) => {
  switch(action.type){
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case FILTER_CONTACTS:
      return{
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi')
          return contact.name.match(regex) || contact.email.match(regex)
        })
      }
    case UPDATE_CONTACT:
      return{
        ...state,
        contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case SET_CURRENT:
      return{
        ...state,
        current: action.payload
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      }
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      }
    default:
      return state
  }
}